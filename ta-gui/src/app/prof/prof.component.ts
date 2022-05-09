import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Router } from '@angular/router';
import { Pessoa } from '../../../../common/pessoa';

@Component({
  selector: 'professores',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
   constructor(private _route: Router) {}

   prof: Pessoa = new Pessoa();
   cpfduplicado: boolean = false;

  logarProf(a: Pessoa): void {
    var prof = new Pessoa()
    prof.name = "Professor"
    prof.role = "p"
    prof.email = "pmeil@gmail.com"
    // this.loginService.login(prof , "Professor");
    //tela de entrada
    alert("Login efetuado! Seja bem vindo!");
    this._route.navigate(['cadeiras']);
  }

  onMove(): void {
    this.cpfduplicado = false;
  }

  ngOnInit(): void {
  }

}
