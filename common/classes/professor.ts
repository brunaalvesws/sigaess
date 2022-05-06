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
    professor.nome = a.nome;
    professor.cpf = a.cpf;
    professor.dt_nasc = a.dt_nasc;
    professor.senha = a.senha;
    professor.email = a.email;
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
