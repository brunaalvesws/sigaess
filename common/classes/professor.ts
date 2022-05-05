import { Pessoa } from './pessoa'

export class Professor {
  nome: string;
  cpf: string;
  email: string;
  dt_nasc: string;
  senha: string;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome = "";
    this.cpf = "";
    this.dt_nasc = "";
    this.senha = "";
    this.email = "";
  }

  clone(a: Pessoa): Professor {
    var professor: Professor = new Professor();
    professor.nome = this.nome;
    professor.cpf = this.cpf;
    professor.dt_nasc = this.dt_nasc;
    professor.senha = this.senha;
    professor.email = this.email;
    return professor;
  }

  copyFrom(from: Professor): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.email = from.email;
    this.dt_nasc = from.dt_nasc;
    this.senha = from.senha;
  }
}
