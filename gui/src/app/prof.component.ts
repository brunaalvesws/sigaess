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

   criarProf(a: Professor): void {
     if (this.profService.criar(a)) {
       this.profs.push(a);
       this.prof = new Professor();
     } else {
       this.cpfduplicado = true;
     }
   }

   logarProf(a: Professor): void {
    if (this.profService.criar(a)) {
      this.profs.push(a);
      this.prof = new Professor();
    } else {
      this.cpfduplicado = true;
    }
  }

   onMove(): void {
      this.cpfduplicado = false;
   }

   ngOnInit(): void {
     this.profs = this.profService.getProfs();
   }

}
