import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Aluno } from '../aluno';

import { Cadeira } from '../cadeiras';
import { CadeiraService } from '../cadeiras.service';
import { LoginService } from '../login.service';
import { Professor } from '../professor';

@Component({  
  selector: 'cadeiras',
  templateUrl: './cadeiras.component.html',
  styleUrls: ['./cadeiras.component.css']
})
export class CadeirasComponent implements OnInit {
  constructor(private cadeirasService: CadeiraService, private loginService: LoginService) {}
  
  accountType: string;
  account: Aluno | Professor = undefined;
  cadeiras: Cadeira[];
  departamentos: string[];

  weekdays: string[] = ["seg", "ter", "qua", "qui", "sex", "sab"];
  horarios: Array<number> = Array(24).fill(0).map((x,i)=>i);;
  departamento: string;
  nomeCadeira: string;
  cadeira: Cadeira = undefined;

  ngOnInit(): void {
    this.cadeiras = this.cadeirasService.getCadeiras();
    this.departamentos = this.cadeirasService.getDepartamentos();
    this.accountType = this.loginService.getType();
    this.account = this.loginService.getAccount();
  }

  getTableLine(k: string): Cadeira[]{
    if (k) {
      return this.cadeirasService.getCadeiras(k);
    }
    return [];
  }

  loadCadeira(nome: string) {
    for (var i = 0; i < this.cadeiras.length; ++i) {
      if (this.cadeiras[i].nome_disciplina == nome) {
        this.cadeira = this.cadeiras[i].clone();
      }
    }
  }

  getType(a: any): string {
    return typeof a;
  }

  checkIfAluno(accountType: string): boolean {
    if (accountType == "Aluno") {
      return true;
    }
    return false;
  }

  checkIfProf(accountType: string): boolean {
    if (accountType == "Professor") {
      return true;
    }
    return false;
  }
}