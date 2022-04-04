import { Component } from '@angular/core';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    aluno: Aluno = {nome: "", cpf: "", dt_nasc: "", senha:""};
    professor: Professor = {nome: "", cpf: "", dt_nasc: "", senha:""};
  }
  
  export class Aluno {
    nome: string;
    cpf: string;
    dt_nasc: string;
    senha: string;
  }
  export class Professor {
    nome: string;
    cpf: string;
    dt_nasc: string;
    senha: string;
  }

