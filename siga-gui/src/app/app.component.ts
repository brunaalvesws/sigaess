import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { PessoaService } from './pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private _route: Router, private pessoaService: PessoaService) {}

  logout(){
    this.pessoaService.logout()
    this._route.navigate(['usuario']);
  }

  ngOnInit(): void {
    this._route.navigate(['usuario']);
  }
}