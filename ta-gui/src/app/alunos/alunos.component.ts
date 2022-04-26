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
  cpfduplicado: boolean = false;

  logarAluno(a: Aluno): void {
    if (this.alunoService.cpfNaoCadastrado(a.cpf)) {
      alert("CPF inválido. Usuário não Cadastrado.")
    } else {
      if (this.alunoService.checksenha(a.cpf,a.senha)){
        alert("Senha inválida. Tente novamente.")
      } else {
        this.loginService.login(this.alunoService.getAlunoCPFPass(a.cpf, a.senha), "Aluno");
        //tela de entrada
        alert("Login efetuado! Seja bem vindo!");
        this._route.navigate(['cadeiras']);
      }
    }
  }
  
  onMove(): void {
    this.cpfduplicado = false;
  }

  ngOnInit(): void {
    this.alunos = this.alunoService.getAlunos();
  }
}


aluno: Aluno = new Aluno();
alunos: Aluno[] = [];
cpfduplicado: boolean = false;

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

onMove(): void {
   this.cpfduplicado = false;
}

 ngOnInit(): void {
   this.alunoService.getAlunos()
         .subscribe(
           as => { this.alunos = as; },
           msg => { alert(msg.message); }
          );
 }

}