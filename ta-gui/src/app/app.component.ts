import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private pessoaService: PessoaService) {}

  logout(){
    this.pessoaService.logout()
  }
}