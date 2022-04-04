import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Professor } from './professor';
import { ProfService } from './prof.service';

@Component({
  selector: 'professores',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
   constructor(private profService: ProfService) {}

   prof: Professor = new Professor();
   profs: Professor[];
   cpfduplicado: boolean = false;

   logarProf(a: Professor): void {
    if (this.profService.cpfNaoCadastrado(a.cpf)) {
      alert("CPF inválido. Usuário não Cadastrado.")
    } else {
      if (this.profService.checksenha(a.cpf,a.senha)){
        alert("Senha inválida. Tente novamente.")
      } else {
        //tela de entrada
        alert("Login efetuado! Seja bem vindo!")
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
