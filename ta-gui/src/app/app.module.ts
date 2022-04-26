import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoService } from './aluno.service';
import { CadeirasComponent } from './cadeiras/cadeiras.component';
import { CadeiraService} from './cadeiras.service';
import { CriarCadeiraComponent } from './criar-cadeira/criar-cadeira.component'
import { ProfComponent } from './prof/prof.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProfService } from './prof.service';
import { LoginService } from '../../../common/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ProfComponent,
    AlunosComponent,
    CadastroComponent,
    CadeirasComponent,
    CriarCadeiraComponent
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
      },
      {
        path: "cadeiras",
        component: CadeirasComponent
      },
      { 
        path: "criarCadeira",
        component: CriarCadeiraComponent
      }
    ])
  ],
  providers: [AlunoService, ProfService, CadeiraService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
