import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Cadeira, CadeiraPackage } from "../../../../common/cadeiras";
import { Pessoa } from '../../../../common/pessoa';

export class CadeiraAluno {
    cadeira: CadeiraPackage;
    aluno = new Pessoa();

    constructor(cadeira: Cadeira, aluno: Pessoa) {
        this.cadeira = new CadeiraPackage(cadeira);
        this.aluno = aluno;
    }
}

@Injectable()
export class CadeiraService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private taURL = 'http://localhost:3000';
    
    constructor(private http: HttpClient) {}

    criar(cadeira: Cadeira): Observable<Cadeira | string> {
        var cadeiraPackage = cadeira.createDataPackage()
        console.log(JSON.stringify(cadeiraPackage))
        return this.http.post<any>(this.taURL + "/cadeira", cadeiraPackage, {headers: this.headers})
            .pipe( 
                retry(2),
                map( res => {if (res.success) {
                        return cadeira;
                    } else if (res.failure) {
                        return res.failure
                    } else {
                        return null;
                    }
                })
            ); 
    }
 
    atualizar(cadeira: Cadeira): Observable<Cadeira> {
        return this.http.put<any>(this.taURL + "/cadeira", JSON.stringify(cadeira), {headers: this.headers})
          .pipe( 
            retry(2),
            map( res => {
                if (res.success) {
                    return cadeira;
                } else {
                    return null;
                }
            })
        );
    }

    getCadeiras(departamento_ofertante: String = ""): Cadeira[] {
        var result: Cadeira[] = [];
        this.http.get<CadeiraPackage[]>(this.taURL + "/cadeiras")
            .pipe(
                retry(2)
            ).subscribe(
                ar => {
                        if (ar) {
                            for (let c of ar) {
                                if (departamento_ofertante=="" || c.departamento_ofertante==departamento_ofertante) {
                                    var cadeira = new Cadeira();
                                    cadeira.copyFromDataPackage(c);
                                    result.push(cadeira);
                                }
                            }
                        }
                    },
                msg => { alert(msg.message); }
            );
        console.log(result.length)
        return result;        
    }

    getDepartamentos(): Observable<string[]> {
        return this.http.get<string[]>(this.taURL + "/departamentos")
            .pipe(
                retry(2)
            )
    }

    addAluno(cadeira: Cadeira, aluno: Pessoa): Observable<Cadeira | string> {
        var cadeiraAluno = new CadeiraAluno(cadeira, aluno)
        return this.http.put<any>(this.taURL + "/cadeiraAddAluno", JSON.stringify(cadeiraAluno), {headers: this.headers})
            .pipe(
                retry(2),
                map( res => {
                    if (res.success) {
                        return cadeira;
                    } else if (res.failure) {
                        return res.failure;
                    } else {
                        return null;
                    }
                })
            );
    }
}

