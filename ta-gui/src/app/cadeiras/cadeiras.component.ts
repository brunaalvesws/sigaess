import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Cadeira } from '../../../../common/cadeiras';
import { CadeiraService } from '../cadeiras.service';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../common/pessoa';

@Component({  
  selector: 'cadeiras',
  templateUrl: './cadeiras.component.html',
  styleUrls: ['./cadeiras.component.css']
})
export class CadeirasComponent implements OnInit {
  constructor(private cadeirasService: CadeiraService, private pessoaService: PessoaService) {}
  
  accountType: string;
  account: Pessoa = undefined;
  cadeiras: Cadeira[];
  departamentos: string[];

  weekdays: string[] = ["seg", "ter", "qua", "qui", "sex", "sab"];
  horarios: Array<number> = Array(15).fill(-1).map((x,i)=>i+8);
  departamento: string;
  nomeCadeira: string;
  cadeira: Cadeira = undefined;
  cadeiras_departamento: Cadeira[];

  ngOnInit(): void {
    this.cadeiras = this.cadeirasService.getCadeiras();
    this.cadeirasService.getDepartamentos().subscribe(
      ar => {
        if (ar) {
          this.departamentos = Object.assign([], ar);;
        }
      },
      msg => { alert(msg.message); }
    );
    this.accountType = this.pessoaService.getType();
    this.account = this.pessoaService.getAccount();
    this.cadeiras_departamento = [];
  }

  getTableLine(k: string): void {
    console.log(k)
    if (k) {
      this.cadeiras_departamento = this.cadeirasService.getCadeiras(k);
    }
  }

  loadCadeira(nome: string) {
    for (var i = 0; i < this.cadeiras.length; ++i) {
      if (this.cadeiras[i].nome_disciplina == nome) {
        this.cadeira = this.cadeiras[i].clone();
        return;
      }
    }
  }

  getType(a: any): string {
    return typeof a;
  }

  checkIfAluno(account: Pessoa): boolean {
    if (account.role === "a") {
      return true;
    }
    return false;
  }

  checkIfProf(account: Pessoa): boolean {
    if (account.role === "p") {
      return true;
    }
    return false;
  }

  matricula(cadeira: Cadeira, aluno: Pessoa) {
    if (aluno.role === "a") {
      this.cadeirasService.addAluno(cadeira, aluno).subscribe(
        ar => {
          
        },
        msg => { alert(msg.message); }
      );
    }
  }
}