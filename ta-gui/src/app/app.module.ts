import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PessoaService } from './pessoa.service';
import { CadeirasComponent } from './cadeiras/cadeiras.component';
import { CadeiraService} from './cadeiras.service';
import { CriarCadeiraComponent } from './criar-cadeira/criar-cadeira.component'
import { CadastroComponent } from './cadastro/cadastro.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    CadastroComponent,
    CadeirasComponent,
    CriarCadeiraComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    RouterModule.forRoot([
      {
        path: 'usuario',
        component: UsuarioComponent
      },
      {
        path: 'cadastro',
        component: CadastroComponent
      },
      {
        path: 'metas',
        component: MetasComponent
      },
      {
        path: "cadeiras",
        component: CadeirasComponent
      },
      { 
        path: "criarCadeira",
        component: CriarCadeiraComponent
      },
      { 
        path: "perfil",
        component: PerfilComponent
      },
      { 
        path: "login",
        component: AppComponent
      }
    ]),
  ],
  providers: [ PessoaService, CadeiraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
