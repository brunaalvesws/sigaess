import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../../../../common/classes/professor';
import { ProfService } from '../prof.service';
import { Router } from '@angular/router';

@Component({
  selector: 'professores',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
   constructor(private _route: Router, private profService: ProfService) {}

   prof: Professor = new Professor();
   profs: Observable<Professor[]>;

   logarProf(a: Professor): void {
    if (this.profService.logar(a)) {
      alert("Login efetuado! Seja bem vindo!");
      this._route.navigate(['cadeiras']);
    } else {
      alert("Credenciais inválidas. Tente novamente.")
    }
  }

   ngOnInit(): void {
     this.profs = this.profService.getProfs();
   }

}
