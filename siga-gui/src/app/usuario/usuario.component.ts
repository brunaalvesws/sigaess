import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../common/pessoa';


@Component({  
  selector: 'app-root',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  constructor(private _route: Router, private pessoaService: PessoaService) {}

  pessoa: Pessoa = new Pessoa();

  async logar(a: Pessoa): Promise<void> {
    var result = this.pessoaService.login(a.email, a.senha); 
    if (await result === 'success') {
      await this.pessoaService.getPessoaWithEmail(a.email)
      alert("Login efetuado! Seja bem vindo!");
      this._route.navigate(['cadeiras']);
    } else {
      alert("Falhas nas credenciais, tente novamente");
    }
  }


  ngOnInit(): void {
  }
}