import { Injectable } from '@angular/core';
import { Aluno } from '../classes/aluno';
import { Professor } from '../classes/professor';
import { CadastroDeAlunos } from '../../ta-server/cadastrodealunos';
import { CadastroDeProfessor } from '../../ta-server/cadastrodeprofs';

@Injectable()
export class LoginService {
  constructor(private cadastroAlunos: CadastroDeAlunos, private cadastroProf: CadastroDeProfessor) {}

  loginAluno (cpf: string, senha: string) : string{
    if (this.cadastroAlunos.getAlunos().find(a => a.cpf == cpf)) {
      if (this.cadastroAlunos.getAlunos().find(a => a.cpf == cpf && a.senha == senha)){
        return "success"
      } else {
        return "passworderror"
      }
    } else {
      return "cpferror"
    }
  }

  loginProf (cpf: string, senha: string) : string {
    if (this.cadastroProf.getProfessores().find(a => a.cpf == cpf) && this.checkCPF(cpf)) {
      if (this.cadastroProf.getProfessores().find(a => a.cpf == cpf && a.senha == senha)){
        return "success"
      } else {
        return "passworderror"
      }
    } else {
      return "cpferror"
    }
  }

  checkCPF(cpf: string) : boolean {
    if (/^[0-9]+$/.test(cpf)) {
      return true
    } else {
      return false
    }
  }
}
