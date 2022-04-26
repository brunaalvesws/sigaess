import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { Aluno } from '../aluno';
import { AlunoService } from '../aluno.service';
import { LoginService } from '../login.service';

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