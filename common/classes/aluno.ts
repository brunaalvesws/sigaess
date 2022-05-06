import { Pessoa } from './pessoa'

export class Aluno {
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
    this.email = "";
    this.dt_nasc = "";
    this.senha = "";
  }

  clone(a: Pessoa): Aluno {
    var aluno: Aluno = new Aluno();
    aluno.nome = a.nome;
    aluno.cpf = a.cpf;
    aluno.email = a.email;
    aluno.dt_nasc = a.dt_nasc;
    aluno.senha = a.senha;
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.email = from.email;
    this.dt_nasc = from.dt_nasc;
    this.senha = from.senha;
  }
}
