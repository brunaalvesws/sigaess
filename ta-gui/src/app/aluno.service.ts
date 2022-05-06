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

  criar(aluno: Aluno): Observable<boolean> {
    return this.http.post<any>(this.sigaURL + "/cadastro", aluno, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return true;} else {return false;}} )
              ); 
  }

  logar(aluno: Aluno): Observable<boolean> {
    return this.http.post<any>(this.sigaURL + "/login", aluno, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return true;} else {return false;}} )
              ); 
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.sigaURL + "/alunos")
      .pipe(
          retry(2)
      );
  }
}
