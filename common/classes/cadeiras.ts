import { Aluno } from "./aluno";

export class Cadeira {
  nome_disciplina: string;
  nome_professor: string;
  numero_vagas: string;
  carga_horaria: number;
  departamento_ofertante: string;
  horarios: Map<string, Set<number>>;
  alunos: Set<Aluno>;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome_disciplina = "";
    this.nome_professor = "";
    this.numero_vagas = "";
    this.carga_horaria = 0;
    this.departamento_ofertante = "";
    this.horarios = this.horariosInitial();
    this.alunos = new Set<Aluno>();
  }

  clone(): Cadeira {
    var cadeira: Cadeira = new Cadeira();
    cadeira.nome_disciplina = this.nome_disciplina;
    cadeira.nome_professor = this.nome_professor;
    cadeira.numero_vagas = this.numero_vagas;
    cadeira.carga_horaria = this.carga_horaria;
    cadeira.departamento_ofertante = this.departamento_ofertante;
    cadeira.horarios = this.cloneHorarios();
    cadeira.alunos = this.cloneAlunos();
    return cadeira;
  }

  horariosInitial(): Map<string, Set<number>> {
    var  horarios: Map<string, Set<number>> = new Map<string, Set<number>>();
    horarios["seg"] = new Set<number>();
    horarios["ter"] = new Set<number>();
    horarios["qua"] = new Set<number>();
    horarios["qui"] = new Set<number>();
    horarios["sex"] = new Set<number>();
    horarios["sab"] = new Set<number>();
    return horarios
  }

  cloneHorarios(): Map<string, Set<number>> {
    var horarios: Map<string, Set<number>> = new Map<string, Set<number>>();
    for (var i in this.horarios) {
      horarios[i] = new Set(JSON.parse(JSON.stringify([...this.horarios[i]])))
    }
    return horarios;
  }

  cloneAlunos(): Set<Aluno> {
    var alunos: Set<Aluno> = new Set(JSON.parse(JSON.stringify([...this.alunos])));
    return alunos;
  }
  
  addHorario(weekday: string, h: number): void {
    if (this.horarios[weekday]) {
      this.horarios[weekday].add(h);
      this.carga_horaria += 1;
    }
  }

  removerHorario(weekday: string, horario: number): void {
    if (this.horarios[weekday]) {
      this.horarios[weekday].delete(horario);
      this.carga_horaria -= 1;
    }
  }

  addAluno(aluno: Aluno): boolean {
    var result: boolean = false;
    if (this.alunos.size < Number(this.numero_vagas)) {
      this.alunos.add(aluno);
      result = true;
    }
    return result;
  }
}
  