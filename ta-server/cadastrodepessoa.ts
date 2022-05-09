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

    getCadeirasPackages(): PessoaPackage[] {
      var pessoasPackages: PessoaPackage[] = [];
      this.pessoas.forEach(a => {
            console.log(a);
            pessoasPackages.push(new PessoaPackage(a));
            console.log(new PessoaPackage(a));
          }
      )
      return pessoasPackages
  }
} 