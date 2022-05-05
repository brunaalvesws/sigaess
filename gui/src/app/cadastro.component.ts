import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
   
   constructor(private alunoService: AlunoService) {}

   aluno: Aluno = new Aluno();
   alunos: Aluno[];
   cpfduplicado: boolean = false;

   criarAluno(a: Aluno): void {
     if (this.alunoService.criar(a)) {
       this.alunos.push(a);
       this.aluno = new Aluno();
       alert("Cadastro realizado. Faça Login.")
     } else {
       alert("Esse CPF já foi cadastrado. Tente Novamente")
       this.cpfduplicado = true;
     }
   }

   onMove(): void {
      this.cpfduplicado = false;
   }

   ngOnInit(): void {
     this.alunos = this.alunoService.getAlunos();
   }

}
