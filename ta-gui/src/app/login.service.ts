import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

import { Professor } from './professor';

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
