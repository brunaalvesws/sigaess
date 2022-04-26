import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Professor } from '../professor';
import { ProfService } from '../prof.service';
import { LoginService } from '../login.service';
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
   cpfduplicado: boolean = false;

  logarProf(a: Professor): void {
    if (this.profService.cpfNaoCadastrado(a.cpf)) {
      alert("CPF inválido. Usuário não Cadastrado.");
    } else {
      if (this.profService.checksenha(a.cpf,a.senha)){
        alert("Senha inválida. Tente novamente.");
      } else {
        this.loginService.login(this.profService.getProfCPFPass(a.cpf, a.senha), "Professor");
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
     this.profs = this.profService.getProfs();
   }

}
