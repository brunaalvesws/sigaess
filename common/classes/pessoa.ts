export class Pessoa {
    nome: string;
    cpf: string;
    email: string;
    dt_nasc: string;
    senha: string;
    user_type: string;
    grade_horaria: Map<string, Map<number, string>>;

    constructor() {
      this.clean();
    }

    clean(): void {
      this.nome = "";
      this.cpf = "";
      this.email = "";
      this.dt_nasc = "";
      this.senha = "";
      this.user_type = "";
      this.grade_horaria = this.horariosInitial();
    }

    horariosInitial(): Map<string, Map<number, string>> {
        var  horarios: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
        horarios["seg"] = new Map<number, string>();
        horarios["ter"] = new Map<number, string>();
        horarios["qua"] = new Map<number, string>();
        horarios["qui"] = new Map<number, string>();
        horarios["sex"] = new Map<number, string>();
        horarios["sab"] = new Map<number, string>();
        return horarios;
    }

    cloneHorarios(): Map<string, Map<number, string>> {
        var horarios: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
        horarios = new Map(JSON.parse(JSON.stringify([...this.grade_horaria])))
        return horarios;
    }

    clone(): Pessoa {
      var pessoa: Pessoa = new Pessoa();
      pessoa.nome = this.nome;
      pessoa.cpf = this.cpf;
      pessoa.email = this.email;
      pessoa.dt_nasc = this.dt_nasc;
      pessoa.senha = this.senha;
      pessoa.user_type = this.user_type;
      pessoa.grade_horaria = this.cloneHorarios();
      return pessoa;
    }
}