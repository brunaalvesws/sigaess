import { Injectable } from '@angular/core';
import { Aluno } from '../../../common/classes/aluno';

import { Professor } from '../../../common/classes/professor';

@Injectable()
export class LoginService {
  type: string = '';
  account: Professor | Aluno | null = null;

  login(account: Professor | Aluno, type: string) {
    this.account = account;
    this.type = type;
  }

  getType(): string {
    return this.type;
  }

  getAccount(): Professor | Aluno | null {
    return this.account;
  }
}

cpfNaoCadastrado(cpf: string): boolean {
  return !this.alunos.find(a => a.cpf == cpf);
}

checksenha(cpf: string, senha: string): boolean {
 return !this.alunos.find(a => a.cpf == cpf && a.senha == senha);
}

getAlunoCPFPass(cpf: string, senha: string): Aluno {
 return this.alunos.find(a => a.cpf == cpf && a.senha == senha);
