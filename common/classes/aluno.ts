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

  clone(): Aluno {
    var aluno: Aluno = new Aluno();
    aluno.nome = this.nome;
    aluno.cpf = this.cpf;
    aluno.email = this.email;
    aluno.dt_nasc = this.dt_nasc;
    aluno.senha = this.senha;
    return aluno;
  }
}
