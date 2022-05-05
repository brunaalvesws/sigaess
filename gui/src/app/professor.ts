export class Professor {
  nome: string;
  cpf: string;
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
  }

  clone(): Professor {
    var professor: Professor = new Professor();
    professor.nome = this.nome;
    professor.cpf = this.cpf;
    professor.dt_nasc = this.dt_nasc;
    professor.senha = this.senha;
    return professor;
  }
}
