import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { Aluno } from '../../../../common/classes/aluno';
import { Pessoa } from '../../../../common/classes/pessoa';
import { AlunoService } from '../aluno.service';
import { ProfService } from '../prof.service';
import { Professor } from '../../../../common/classes/professor';

@Component({
  selector: 'app-root',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
   
  constructor(private _route: Router, private alunoService: AlunoService, private profService: ProfService) {}

  typeAccount: string;

  criarPessoa(a: Pessoa, typeAccount: string): void {
    if (typeAccount == "aluno") {
      if (this.alunoService.criar(a)) {
        alert("Cadastro realizado. Faça Login.")
        this._route.navigate(['alunos']);
      } else {
        alert("Esse CPF já foi cadastrado. Tente Novamente")
      }
    } else if (typeAccount == "prof") {
      if (this.profService.criar(a)) {
        alert("Cadastro realizado. Faça Login.")
        this._route.navigate(['professores']);
      } else {
        alert("Esse CPF já foi cadastrado. Tente Novamente")
      }
    }
  }

}
