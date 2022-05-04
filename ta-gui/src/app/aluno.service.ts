import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Aluno } from '../../../common/classes/aluno';

@Injectable()
export class AlunoService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private sigaURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<any>(this.sigaURL + "/cadastro", aluno, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return aluno;} else {return null;}} )
              ); 
  }

  logar(cpf: string, senha: string): boolean {
    return this.http.post<any>(this.sigaURL + "/alunos", cpf, senha, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return true;} else {return null;}} )
              ); 
  }

  getAlunos(){
    return this.http.get()
                    .pipe( 
                      retry(2),
                      map( res => {if (res.success) {return true;} else {return null;}} )
                    ); 
  }
}
