import { Injectable } from '@angular/core';

import { Professor } from './professor';

@Injectable()
export class ProfService {
  profs: Professor[] = [];

  criar(professor: Professor): Professor | null{
    professor = professor.clone();
    var result = null;
    if (this.cpfNaoCadastrado(professor.cpf)) {
      this.profs.push(professor);
      result = professor;
    }
    return result;
  }

  cpfNaoCadastrado(cpf: string): boolean {
     return !this.profs.find(a => a.cpf == cpf);
  }
  
  getProfs(): Professor[] {
    var result: Professor[] = [];
    for (let a of this.profs) {
      result.push(a.clone());
    }
    return result;
  }
}
