import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Professor } from '../../../../common/classes/professor';
import { ProfService } from '../prof.service';
import { LoginService } from '../../../../common/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'professores',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
   constructor(private _route: Router, private profService: ProfService, private loginService: LoginService) {}

   prof: Professor = new Professor();
   profs: Professor[];

   logarProf(a: Professor): void {
    if (this.loginService.loginProf(a.cpf, a.senha) == "cpferror") {
      alert("CPF inválido")
    } else {
      if (this.loginService.loginProf(a.cpf, a.senha) == "passworderror"){
        alert("Senha inválida. Tente novamente.")
      } else {
        alert("Login efetuado! Seja bem vindo!");
        this._route.navigate(['cadeiras']);
      }
    }
  }

   ngOnInit(): void {
     this.profs = this.profService.getProfs();
   }

}
