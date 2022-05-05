import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno } from '../../../../common/classes/aluno';
import { AlunoService } from '../aluno.service';


@Component({  
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  constructor(private _route: Router, private alunoService: AlunoService) {}

  aluno: Aluno = new Aluno();
  alunos: Observable<Aluno[]>;

  logarAluno(a: Aluno): void {
    if (this.alunoService.logar(a)) {
      alert("Login Efetuado. Seja bem vindo!")
      this._route.navigate(['cadeiras']);
    } else {
      alert("Senha inválida. Tente novamente.")
    }
  }
  
  ngOnInit(): void {
    this.alunos = this.alunoService.getAlunos(); //achar de onde vem o get
  }
}



/*constructor(private alunoService: AlunoService) {}

 criarAluno(a: Aluno): void {
   this.alunoService.criar(a)
          .subscribe(
            ar => {
              if (ar) {
                this.alunos.push(ar);
                this.aluno = new Aluno();
              } else {
                this.cpfduplicado = true;
              } 
            },
            msg => { alert(msg.message); }
          );
} 


 ngOnInit(): void {
   this.alunoService.getAlunos()
         .subscribe(
           as => { this.alunos = as; },
           msg => { alert(msg.message); }
          );
 }

} */