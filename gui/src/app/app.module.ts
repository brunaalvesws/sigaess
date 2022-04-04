import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfComponent } from './prof.component';
import { AlunosComponent } from './alunos.component';
import { AlunoService } from './aluno.service';
import { ProfService } from './prof.service';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfComponent,
    AlunosComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'professores',
        component: ProfComponent
      },
      {
        path: 'alunos',
        component: AlunosComponent
      },
      {
        path: 'cadastro',
        component: CadastroComponent
      }
    ])
  ],
  providers: [AlunoService, ProfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
