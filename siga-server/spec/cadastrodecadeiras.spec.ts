import { CadastroDeCadeiras } from '../cadastrodecadeiras';
import { Pessoa } from '../../common/pessoa';
import { Cadeira } from '../../common/cadeiras';

describe("O cadastro de Cadeiras", () => {
  var cadastro: CadastroDeCadeiras;

  beforeEach(() => cadastro = new CadastroDeCadeiras())

  it("é inicialmente vazio", () => {
    expect(cadastro.getCadeiras().length).toBe(0);
  })

  it("cadastra Cadeiras corretamente", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Introdução à Programação";
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "70";
    cadeira.departamento_ofertante = "CIn";
    cadeira.addHorario("seg", 8);
    cadeira.addHorario("seg", 9);
    cadeira.addHorario("sex", 8);
    cadeira.addHorario("sex", 9);
    cadeira.addHorario("qua", 8);
    cadeira.addHorario("qua", 9);
    cadeira.addHorario("qua", 13);
    cadeira.addHorario("qua", 14);
    cadastro.criar(cadeira)


    expect(cadastro.getCadeiras().length).toBe(1);
    cadeira = cadastro.getCadeiras()[0];
    expect(cadeira.nome_disciplina).toBe("Introdução à Programação");
    expect(cadeira.nome_professor).toBe("Filipe Calegário");
  })

  it("não aceita Cadeiras sem horários", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Introdução à Programação";
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "70";
    cadeira.departamento_ofertante = "CIn";
    cadastro.criar(cadeira)


    expect(cadastro.getCadeiras().length).toBe(0);
  })

  it("não aceita Cadeiras sem departamento", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Introdução à Programação";
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "70";
    cadastro.criar(cadeira)


    expect(cadastro.getCadeiras().length).toBe(0);
  })

  it("não aceita Cadeiras sem nome", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "70";
    cadeira.departamento_ofertante = "CIn";
    cadastro.criar(cadeira)


    expect(cadastro.getCadeiras().length).toBe(0);
  })

  it("não aceita Cadeiras sem professor", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Introdução à Programação";
    cadeira.numero_vagas = "70";
    cadeira.departamento_ofertante = "CIn";
    cadastro.criar(cadeira)


    expect(cadastro.getCadeiras().length).toBe(0);
  })

  it("só aceita Cadeiras com número de vagas válido", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Introdução à Programação";
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "0";
    cadeira.departamento_ofertante = "CIn";
    cadastro.criar(cadeira)


    expect(cadastro.getCadeiras().length).toBe(0);
  })

  it("não aceita Cadeiras com nome repetido", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Introdução à Programação";
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "70";
    cadeira.departamento_ofertante = "CIn";
    cadeira.addHorario("seg", 8);
    cadeira.addHorario("seg", 9);
    cadeira.addHorario("sex", 8);
    cadeira.addHorario("sex", 9);
    cadeira.addHorario("qua", 8);
    cadeira.addHorario("qua", 9);
    cadeira.addHorario("qua", 13);
    cadeira.addHorario("qua", 14);
    cadastro.criar(cadeira)

    var cadeira2: Cadeira = new Cadeira();
    cadeira2.nome_disciplina = "Introdução à Programação";
    cadeira2.nome_professor = "Ricardo";
    cadeira2.numero_vagas = "70";
    cadeira2.departamento_ofertante = "CIn";
    cadeira2.addHorario("seg", 8);
    cadeira2.addHorario("seg", 9);
    cadeira2.addHorario("sex", 8);
    cadeira2.addHorario("sex", 9);
    cadeira2.addHorario("qua", 8);
    cadeira2.addHorario("qua", 9);
    cadeira2.addHorario("qua", 13);
    cadeira2.addHorario("qua", 14);
    cadastro.criar(cadeira2)


    expect(cadastro.getCadeiras().length).toBe(1);
  })

  it("não aceita Cadeiras do mesmo professor com horários coincidentes", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Criatividade Computacional";
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "70";
    cadeira.departamento_ofertante = "CIn";
    cadeira.addHorario("seg", 8);
    cadeira.addHorario("seg", 9);
    cadeira.addHorario("sex", 8);
    cadeira.addHorario("sex", 9);
    cadeira.addHorario("qua", 8);
    cadeira.addHorario("qua", 9);
    cadeira.addHorario("qua", 13);
    cadeira.addHorario("qua", 14);
    cadastro.criar(cadeira)

    var cadeira2: Cadeira = new Cadeira();
    cadeira2.nome_disciplina = "Introdução à Programação";
    cadeira2.nome_professor = "Filipe Calegário";
    cadeira2.numero_vagas = "70";
    cadeira2.departamento_ofertante = "CIn";
    cadeira2.addHorario("seg", 8);
    cadeira2.addHorario("seg", 9);
    cadeira2.addHorario("sex", 8);
    cadeira2.addHorario("sex", 9);
    cadeira2.addHorario("qua", 8);
    cadeira2.addHorario("qua", 9);
    cadeira2.addHorario("qua", 13);
    cadeira2.addHorario("qua", 14);
    cadastro.criar(cadeira2)


    expect(cadastro.getCadeiras().length).toBe(1);
  })

  it("matricula Alunos em Cadeiras corretamente", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Introdução à Programação";
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "70";
    cadeira.departamento_ofertante = "CIn";
    cadeira.addHorario("seg", 8);
    cadeira.addHorario("seg", 9);
    cadeira.addHorario("sex", 8);
    cadeira.addHorario("sex", 9);
    cadeira.addHorario("qua", 8);
    cadeira.addHorario("qua", 9);
    cadeira.addHorario("qua", 13);
    cadeira.addHorario("qua", 14);
    cadastro.criar(cadeira)

    var aluno: Pessoa = new Pessoa();
    aluno.name = "Bruna";
    aluno.email = "baws@cin.com";
    aluno.role = "p";
    aluno.senha = "bruna12345";

    var adicionou = cadastro.addAluno(cadeira, aluno);
    expect(cadastro.getCadeiras().length).toBe(1);
    expect(adicionou).toBe(true);
    expect(cadeira.alunos.size).toBe(1);
  })

  it("não matricula Alunos em Cadeiras que não possuam mais vagas", () => {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = "Introdução à Programação";
    cadeira.nome_professor = "Filipe Calegário";
    cadeira.numero_vagas = "1";
    cadeira.departamento_ofertante = "CIn";
    cadeira.addHorario("seg", 8);
    cadeira.addHorario("seg", 9);
    cadeira.addHorario("sex", 8);
    cadeira.addHorario("sex", 9);
    cadeira.addHorario("qua", 8);
    cadeira.addHorario("qua", 9);
    cadeira.addHorario("qua", 13);
    cadeira.addHorario("qua", 14);
    cadastro.criar(cadeira)

    var aluno: Pessoa = new Pessoa();
    aluno.name = "Bruna";
    aluno.email = "baws@cin.com";
    aluno.role = "a";
    aluno.senha = "bruna12345";

    var adicionou = cadastro.addAluno(cadeira, aluno);

    var aluno2: Pessoa = new Pessoa();
    aluno2.name = "Filipe";
    aluno2.email = "fgm3@cin.com";
    aluno2.role = "a";
    aluno2.senha = "filipe12345";

    var adicionou = cadastro.addAluno(cadeira, aluno2);

    expect(cadastro.getCadeiras().length).toBe(1);
    expect(adicionou).toBe(false);
    expect(cadeira.alunos.size).toBe(1);
  })

})