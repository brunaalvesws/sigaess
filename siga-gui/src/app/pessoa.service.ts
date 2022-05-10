import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa, PessoaPackage } from '../../../common/pessoa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import { Firestore, doc, getDoc, collection, addDoc} from '@angular/fire/firestore';
import { map, Observable, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private _route: Router, private auth: Auth, private db: Firestore) {}
  type: string = '';
  account: Pessoa = undefined;

  async criar(a: Pessoa) {
    var result: string;
    await createUserWithEmailAndPassword(this.auth, a.email, a.senha).then(res => {
      result = 'success';
      this.post(a);
      this.http.post<any>(this.taURL + "/usuario", a.createDataPackage(), {headers: this.headers})
        .pipe( 
          retry(2),
          map( res => {if (res.success) {return res} else {return null}} )
        ).subscribe(
          ar => {
            if (ar) {

            } else {

            } 
          },
          msg => {  }
        );
      })
      .catch(err => {
        result = err.message;
      });
    return result;
  }

  getType(): string {
    return this.account.role;
  }

  getAccount(): Pessoa {
    return this.account;
  }

  // LOG OUT METHOD
  logout() {
      signOut(this.auth);
      this.account = undefined;
  };

  // LOGIN
  async login(email: string, password: string) : Promise<string> {
      var result: string;
      await signInWithEmailAndPassword(this.auth, email, password).then(res => {
          var optp = res.operationType;
          if (optp === 'signIn'){
            result = 'success';
          }
      })
      .catch(err => {
          result = err.message;
      });
      return result;
  }

  getPessoaWithEmail(email: string): Promise<PessoaPackage[]> {
    var aux = this.http.get<PessoaPackage[]>(this.taURL + "/usuarios")
      .pipe(
          retry(2)
      )
    aux.subscribe(
      ar => {
        if (ar) {
          for (let p of ar) {
            if (p.email === email) {
              var pessoa = new Pessoa();
              pessoa.copyFromDataPackage(p);
              this.account = pessoa;
              break
            }
          }
        }
      },
      msg => { alert(msg.message); }
    );
    return aux.toPromise()
  } 

  post (person: Pessoa) {
    var data = this.toFirestore(person)
    addDoc(collection(this.db,'pessoa'), data).then(() => console.log("Data successfully stored"));
  }

  async get (person)  { 
    var data;
    const pessoaref = doc(this.db,'pessoa',person.uid);
    const docSnap = await getDoc(pessoaref);
    if (docSnap.exists()){
        data = this.fromFirestore(docSnap.data());
        return data;
    } else {
        return 'fail'
    }
  }

  toFirestore(person: Pessoa): object {
    return {
      'uid': person.uid,
      'name': person.name,
      'email': person.email,
      'role': person.role,
      'horarios': JSON.stringify(person.horarios)
    };
  }

  fromFirestore(data: object): Pessoa {
    return new Pessoa(data['uid'], data['name'], data['email'], data['role'], data['horarios']);
  }
}
