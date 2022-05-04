import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { Aluno } from '../../../../common/classes/aluno';
import { AlunoService } from '../aluno.service';
import { LoginService } from '../../../../common/services/login.service';

@Component({  
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  constructor(private _route: Router, private alunoService: AlunoService, private loginService: LoginService) {}

  aluno: Aluno = new Aluno();
  alunos: Aluno[];

  logarAluno(cpf: string, senha: string): void {
    if (this.loginService.loginAluno(cpf, senha) == "cpferror") {
      alert("CPF inválido")
    } else {
      if (this.loginService.loginAluno(cpf, senha) == "passworderror"){
        alert("Senha inválida. Tente novamente.")
      } else {
        alert("Login efetuado! Seja bem vindo!");
        this._route.navigate(['cadeiras']);
      }
    }
  }
  
  ngOnInit(): void {
    this.alunos = this.alunoService.getAlunos(); //achar de onde vem o get
  }
}



constructor(private alunoService: AlunoService) {}

 criarAluno(a: Aluno): void {
   this.alunoService.criar(a)
          .subscribe(
            ar => {
              if (ar) {
                this.alunos.push(ar);
                this.aluno = new Aluno();
              } else {
                this.cpfduplicado = true;
              } 
            },
            msg => { alert(msg.message); }
          );
} 


 ngOnInit(): void {
   this.alunoService.getAlunos()
         .subscribe(
           as => { this.alunos = as; },
           msg => { alert(msg.message); }
          );
 }

}