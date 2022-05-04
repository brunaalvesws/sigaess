import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Professor } from '../../../common/classes/professor';

@Injectable()
export class ProfService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private sigaURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(prof: Professor): Observable<Professor> {
    return this.http.post<any>(this.sigaURL + "/cadastro", prof, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return prof;} else {return null;}} )
              ); 
  }

  logar(cpf: string, senha: string): boolean {
    return this.http.post<any>(this.sigaURL + "/professores", cpf, senha, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return true;} else {return null;}} )
              ); 
  }

  getProfs(){
    return this.http.get()
                    .pipe( 
                      retry(2),
                      map( res => {if (res.success) {return true;} else {return null;}} )
                    ); 
  }
}
