import { CadastroDePessoas } from '../cadastrodepessoa';
import { Pessoa } from '../../common/pessoa';

describe("O cadastro de Pessoas", () => {
  var cadastro: CadastroDePessoas;

  beforeEach(() => cadastro = new CadastroDePessoas())

  it("é inicialmente vazio", () => {
    expect(cadastro.getPessoas().length).toBe(0);
  })

  it("cadastra Pessoas corretamente", () => {
    var pessoa: Pessoa = new Pessoa();
    pessoa.name = "Bruna";
    pessoa.email = "baws@cin.com";
    pessoa.role = "p";
    pessoa.senha = "bruna12345";
    cadastro.criar(pessoa);

    expect(cadastro.getPessoas().length).toBe(1);
    pessoa = cadastro.getPessoas()[0];
    expect(pessoa.name).toBe("Bruna");
    expect(pessoa.email).toBe("baws@cin.com");
  })

  it("não aceita Pessoas com email duplicado", () => {
    var pessoa: Pessoa = new Pessoa();
    pessoa.name = "Bruna";
    pessoa.email = "baws@cin.com";
    pessoa.role = "p";
    pessoa.senha = "bruna12345";
    cadastro.criar(pessoa);

    pessoa = new Pessoa();
    pessoa.name = "Filipe";
    pessoa.email = "baws@cin.com";
    pessoa.role = "p";
    pessoa.senha = "filipe12345";
    cadastro.criar(pessoa);

    expect(cadastro.getPessoas().length).toBe(1);
  })

  it("retorna uma pessoa cadastrada a partir de seu email", () => {
    var pessoa: Pessoa = new Pessoa();
    pessoa.name = "Bruna";
    pessoa.email = "baws@cin.com";
    pessoa.role = "a";
    pessoa.senha = "bruna12345";
    cadastro.criar(pessoa);

    var email: string;
    email = "baws@cin.com";

    var retorno = cadastro.getWithEmail(email);
    expect(retorno.name).toBe(pessoa.name);
    expect(retorno.email).toBe(pessoa.email);
    expect(retorno.role).toBe(pessoa.role);
    expect(retorno.senha).toBe(pessoa.senha);
  })

  it("não retorna uma pessoa caso o email não seja de nenhuma pessoa cadastrada", () => {
    var pessoa: Pessoa = new Pessoa();
    pessoa.name = "Bruna";
    pessoa.email = "baws@cin.com";
    pessoa.role = "a";
    pessoa.senha = "bruna12345";
    cadastro.criar(pessoa);

    var email: string;
    email = "fgm3@cin.com"

    expect(cadastro.getWithEmail(email)).toBe(undefined);
  })

})