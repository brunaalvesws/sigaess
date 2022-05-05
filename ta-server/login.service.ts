import { CadastroDeAlunos } from './cadastrodealunos';
import { CadastroDeProfessor } from './cadastrodeprofs';

import { Professor } from '../common/classes/professor';
import { Aluno } from '../common/classes/aluno';



export class LoginService {

  constructor(private cadastroAlunos: CadastroDeAlunos, private cadastroProf: CadastroDeProfessor) {}

  type: string = '';
  cpf: string;

  loginAluno (cpf: string, senha: string) : string{
    if (this.cadastroAlunos.getAlunos().find(a => a.cpf == cpf)) {
      if (this.cadastroAlunos.getAlunos().find(a => a.cpf == cpf && a.senha == senha)){
        this.type = "aluno"
        this.cpf = cpf
        return "success"
        //chamar o firebase
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
        this.type = "professor"
        this.cpf = cpf
        return "success"
        //chamar o firebase
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


  getType(): string {
    return this.type;
  }

  getAccount(): Aluno | Professor {
    if(this.getType() == 'aluno'){
      return this.cadastroAlunos.getAlunos().find(a => a.cpf == this.cpf)
    } else {
      return this.cadastroProf.getProfessores().find(a => a.cpf == this.cpf)
    }
  }
}
