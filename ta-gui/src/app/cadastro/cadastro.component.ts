import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { Aluno } from '../aluno';
import { AlunoService } from '../aluno.service';
import { ProfService } from '../prof.service';
import { Professor } from '../professor';

@Component({
  selector: 'app-root',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
   
  constructor(private _route: Router, private alunoService: AlunoService, private profService: ProfService) {}

  aluno: Aluno = new Aluno();
  alunos: Aluno[];
  cpfduplicado: boolean = false;
  typeAccount: string;

  criarAluno(a: Aluno, typeAccount: string): void {
    if (typeAccount == "aluno") {
      if (this.alunoService.criar(a)) {
        this.alunos.push(a);
        this.aluno = new Aluno();
        alert("Cadastro realizado. Faça Login.")
        this._route.navigate(['professores']);
      } else {
        alert("Esse CPF já foi cadastrado. Tente Novamente")
        this.cpfduplicado = true;
      }
    } else if (typeAccount == "prof") {
      var professor = new Professor();
      professor.nome = this.aluno.nome;
      professor.cpf = this.aluno.cpf;
      professor.dt_nasc = this.aluno.dt_nasc;
      professor.senha = this.aluno.senha;
      if (this.profService.criar(professor)) {
        this.aluno = new Aluno();
        alert("Cadastro realizado. Faça Login.")
        this._route.navigate(['professores']);
      } else {
        alert("Esse CPF já foi cadastrado. Tente Novamente")
        this.cpfduplicado = true;
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
