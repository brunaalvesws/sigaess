import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { PessoaService } from '../services/pessoa.service';
import { Cadeira } from '../../../../common/cadeiras';
import { CadeiraService } from '../services/cadeiras.service';
import { Pessoa } from '../../../../common/pessoa';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private cadeirasService: CadeiraService, private pessoaService: PessoaService) {}
  
  accountType: string;
  account: Pessoa = undefined; //Pessoa = undefined;
  allCadeiras: Cadeira[];
  userCadeiras: Cadeira[];
  weekdays: string[] = ["seg", "ter", "qua", "qui", "sex", "sab"];
  horarios: Array<number> = Array(15).fill(-1).map((x,i)=>i+8);
  nomeCadeira: string;
  cadeira: Cadeira = undefined;
  alunos: string[] = [];

  ngOnInit(): void {
    //this.cadeiras = this.cadeirasService.getCadeirasOfUser(); //uma função que retorna um array de cadeiras contendo
    this.account = this.pessoaService.getAccount(); //firebase //ou que o professor leciona (atributo cadeiras de pessoa?)
    this.accountType = this.account.role
    this.allCadeiras = this.cadeirasService.getCadeiras(); 
    this.loadUserCadeiras();
  }

  loadCadeira(nome: string) {
    for (var i = 0; i < this.allCadeiras.length; ++i) {
      if (this.allCadeiras[i].nome_disciplina == nome) {
        this.cadeira = this.allCadeiras[i].clone();
        this.alunos = Array.from(this.cadeira.alunos)
        console.log(this.alunos)
        return;
      }
    } 
    this.loadUserCadeiras()
  }

  loadUserCadeiras(): void {
    if (this.accountType === "p") {
      console.log(this.allCadeiras.length)
      var result: Cadeira[] = [];
      for (var i = 0; i < this.allCadeiras.length; ++i) {
        if (this.allCadeiras[i].nome_professor === this.account.name) {
          result.push(this.allCadeiras[i].clone());
        }
      }
      console.log(result);
      this.userCadeiras = result;
    } else {
      console.log(this.allCadeiras.length)
      var result: Cadeira[] = [];
      for (var i = 0; i < this.allCadeiras.length; ++i) {
        if (this.allCadeiras[i].alunos.has(this.account.email)) {
          result.push(this.allCadeiras[i].clone());
        }
      }
      console.log(result);
      this.userCadeiras = result;
    }
  }

  checkIfProf(account: Pessoa): boolean {
    if (account.role === "p") {
      return true;
    }
    return false;
  }
}
