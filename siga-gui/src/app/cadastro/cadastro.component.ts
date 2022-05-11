import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { Pessoa } from '../../../../common/pessoa';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-root',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  constructor(private _route: Router, private pessoaService: PessoaService) {}

  pessoa: Pessoa = new Pessoa();

  async criarPessoa(a: Pessoa): Promise<void> {
    if (a.role == "a" || a.role == "p") {
      var result = this.pessoaService.criar(a);
      if (await result === 'success') {
        alert("Cadastro realizado! Faça Login!");
        this._route.navigate(['usuario']);
      } else {
        alert("Informações inválidas");
      }
    } else {
      alert("Selecione um tipo de usuário");
    }
  }

  ngOnInit(): void {
  }

}
