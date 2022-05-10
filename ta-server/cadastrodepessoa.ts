import { Cadeira } from '../common/cadeiras';
import { Pessoa, PessoaPackage } from '../common/pessoa';

export class CadastroDePessoas {
  pessoas: Pessoa[] = [];

  criar(aluno: Pessoa): Pessoa {
    var result = null;
    if (this.cpfNaoCadastrado(aluno.email)) {
      result = new Pessoa();
      result.copyFrom(aluno);
      this.pessoas.push(result);
    }
    return result;
  }

  cpfNaoCadastrado(email: string): boolean {
    return !this.pessoas.find(a => a.email == email);
  }

  atualizar(aluno: Pessoa): Pessoa {
    var result: Pessoa = this.pessoas.find(a => a.email == aluno.email);
    if (result) result.copyFrom(aluno);
    return result;
  }

  getPessoas(): Pessoa[] {
    return this.pessoas;
  }

  checksenha(email: string, senha: string): boolean {
    return !this.pessoas.find(a => a.email == email && a.senha == senha);
  }

  getAlunoCPFPass(email: string, senha: string): Pessoa {
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
    return true;
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
