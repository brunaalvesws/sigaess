import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from '../../../common/pessoa';
import { User, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { Firestore, doc, setDoc, getDoc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  constructor(private _route: Router, private auth: Auth, private db: Firestore) {}
  type: string = '';
  account: Pessoa = undefined;

  criar(a: Pessoa) {
    var result = this.createUser(a.email, a.senha, a)
    return result
  }

  getType(): string {
    return this.type;
  }

  getAccount(): Pessoa {
    var user = this.verifyUser();
    this.account = user;
    this.type = user.role;
    return this.account;
  }

  verifyUser (): Pessoa {
    var user = this.auth.currentUser;
    var pessoa_user = this.fromFirestore(user);
    return pessoa_user
}

// SIGN UP USER
createUser (email: string, password: string, pessoa: Pessoa) : string{
    var result: string;
    createUserWithEmailAndPassword(this.auth, email, password).then(res => {
    var uid = this.auth.currentUser.uid;
    this.post(pessoa);
    result = 'success';
    })
    .catch(err => {
        result = err.message;
    });
    return result;
}


// LOG OUT METHOD
logout() {
    signOut(this.auth);
};

// LOGIN
login(email: string, password: string) : string {
    var result: string;
    signInWithEmailAndPassword(this.auth, email, password).then(res => {
        result = 'success';
    })
    .catch(err => {
        result = err.message;
    });
    return result;
}

post (person: Pessoa) {
    var data = this.toFirestore(person)
    setDoc(doc(this.db,'pessoa',data['uid']),data).then(() => console.log("Data successfully stored"));
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
    uid: person.uid,
    name: person.name,
    email: person.email,
    role: person.role,
    horarios: person.horarios
  };
}

fromFirestore(data: object): Pessoa {
  return new Pessoa(data['uid'], data['name'], data['email'], data['role'], data['horarios']);
}
}
