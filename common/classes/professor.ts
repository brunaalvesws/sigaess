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

  clone(): Professor {
    var professor: Professor = new Professor();
    professor.nome = this.nome;
    professor.cpf = this.cpf;
    professor.dt_nasc = this.dt_nasc;
    professor.senha = this.senha;
    professor.email = this.email;
    return professor;
  }
}
