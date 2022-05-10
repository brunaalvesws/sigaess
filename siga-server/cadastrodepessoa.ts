import { Cadeira } from '../common/cadeiras';
import { Pessoa, PessoaPackage } from '../common/pessoa';

export class CadastroDePessoas {
  pessoas: Pessoa[] = [];

  criar(pessoa: Pessoa): Pessoa {
    var result = null;
    if (this.emailNaoCadastrado(pessoa.email)) {
      result = new Pessoa();
      result.copyFrom(pessoa);
      this.pessoas.push(result);
    }
    return result;
  }

  emailNaoCadastrado(email: string): boolean {
    return !this.pessoas.find(a => a.email == email);
  }

  atualizar(pessoa: Pessoa): Pessoa {
    var result: Pessoa = this.pessoas.find(a => a.email == pessoa.email);
    if (result) result.copyFrom(pessoa);
    return result;
  }

  getPessoas(): Pessoa[] {
    return this.pessoas;
  }

  checksenha(email: string, senha: string): boolean {
    return !this.pessoas.find(a => a.email == email && a.senha == senha);
  }

  getpessoaEmailPass(email: string, senha: string): Pessoa {
    return this.pessoas.find(a => a.email == email && a.senha == senha);
  }

  getWithEmail(email: string): Pessoa {
    return this.pessoas.find(a => a.email == email);
  }

  getCadeirasPackages(): PessoaPackage[] {
    var pessoasPackages: PessoaPackage[] = [];
    this.pessoas.forEach(a => {
          pessoasPackages.push(new PessoaPackage(a));
        }
    )
    return pessoasPackages
  }

  checkAddHorario(pessoa: Pessoa, cadeira: Cadeira): boolean {
    console.log("Checando horário")
    console.log(cadeira.horarios)
    var result = true;
    cadeira.horarios.forEach((value: Set<number>, key: string) => {
      console.log(key)
      var horario_cadeira = cadeira.horarios.get(key);
      console.log(horario_cadeira)
      var horario_pessoa = pessoa.horarios.get(key);
      console.log(horario_pessoa)
      if (equal(horario_cadeira, horario_pessoa) || interseccao(horario_cadeira, horario_pessoa)) {
        result = false;
      }
    });
    return result;
  }
}

function equal(arg0: Set<number>, arg1: Map<number, string>) {
  if (arg0.size !== arg1.size) return false;
  if (arg0.size == 0 &&  arg1.size == 0) return false;
  var result = true;
  arg1.forEach((value: string, key: number) => {
    if (!arg0.has(key)) {
      result = false;
    }
  });
  return result;
}

function interseccao(mapA: Set<number>, mapB: Map<number, string>): boolean {
  var _interseccao = new Set();
  mapB.forEach((value: string, key: number) => {
    if (mapA.has(key)) {
      _interseccao.add(value);
    }
  });
  return _interseccao.size !== 0;
}
