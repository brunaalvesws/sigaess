import { Professor } from '../common/professor';

export class CadastroDeProfessor {
   professores: Professor[] = [];

    cadastrar(professor: Professor): Professor {
     var result = null;
     if (this.cpfNaoCadastrado(professor.cpf)) {
       result = new Professor();
       result.copyFrom(professor);
       this.professores.push(result);
     }
     return result;
   }

    cpfNaoCadastrado(cpf: string): boolean {
      return !this.professores.find(a => a.cpf == cpf);
   }

    atualizar(professor: Professor): Professor {
     var result: Professor = this.professores.find(a => a.cpf == professor.cpf);
     if (result) result.copyFrom(professor);
     return result;
   }

    getProfessores(): Professor[] {
     return this.professores;
   }
}