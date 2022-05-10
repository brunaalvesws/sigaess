import { Pessoa } from "./pessoa";

export class Cadeira {
  nome_disciplina: string;
  nome_professor: string;
  numero_vagas: string;
  carga_horaria: number;
  departamento_ofertante: string;
  horarios: Map<string, Set<number>>;
  alunos: Set<string>;

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
    this.alunos = new Set<string>();
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
    horarios.set("seg", new Set<number>());
    horarios.set("ter", new Set<number>());
    horarios.set("qua", new Set<number>());
    horarios.set("qui", new Set<number>());
    horarios.set("sex", new Set<number>());
    horarios.set("sab", new Set<number>());
    return horarios
  }

  cloneHorarios(): Map<string, Set<number>> {
    var horarios: Map<string, Set<number>> = new Map<string, Set<number>>();
    this.horarios.forEach((v, k) => {
      horarios.set(k, new Set(JSON.parse(JSON.stringify([...v]))));
    });
    return horarios;
  }

  cloneAlunos(): Set<string> {
    var alunos: Set<string> = new Set(JSON.parse(JSON.stringify([...this.alunos])));
    return alunos;
  }
  
  addHorario(weekday: string, h: number): void {
    if (this.horarios.get(weekday)) {
      this.horarios.get(weekday).add(h);
      this.carga_horaria += 1;
    }
  }

  removerHorario(weekday: string, horario: number): void {
    if (this.horarios.get(weekday)) {
      this.horarios.get(weekday).delete(horario);
      this.carga_horaria -= 1;
    }
  }

  addAluno(aluno: Pessoa): boolean {
    var result: boolean = false;
    if (this.alunos.size < Number(this.numero_vagas)) {
      this.alunos.add(aluno.email);
      result = true;
    }
    return result;
  }

  copyFrom(from: Cadeira): void {
    this.nome_disciplina = from.nome_disciplina;
    this.nome_professor = from.nome_professor;
    this.numero_vagas = from.numero_vagas;
    this.carga_horaria = from.carga_horaria;
    this.departamento_ofertante = from.departamento_ofertante;
    this.horarios = from.cloneHorarios();
    this.alunos = from.cloneAlunos();
  }

  copyFromDataPackage(from: CadeiraPackage): void {
    this.nome_disciplina = from.nome_disciplina;
    this.nome_professor = from.nome_professor;
    this.numero_vagas = from.numero_vagas;
    this.carga_horaria = from.carga_horaria;
    this.departamento_ofertante = from.departamento_ofertante;
    var horarios = new Map<string, Set<number>>();
    horarios.set("seg", new Set(from.horarios[0]))
    horarios.set("ter", new Set(from.horarios[1]))
    horarios.set("qua", new Set(from.horarios[2]))
    horarios.set("qui", new Set(from.horarios[3]))
    horarios.set("sex", new Set(from.horarios[4]))
    horarios.set("sab", new Set(from.horarios[5]))
    this.horarios = new Map<string, Set<number>>(horarios);
    this.alunos = new Set(from.alunos);
  }

  createDataPackage(): CadeiraPackage {
    var cadeiraPackage = new CadeiraPackage(this);
    return cadeiraPackage;
  }
}
 
export class CadeiraPackage {
  nome_disciplina: string;
  nome_professor: string;
  numero_vagas: string;
  carga_horaria: number;
  departamento_ofertante: string;
  horarios: Array<Array<number>>;
  alunos: Array<string>;

  constructor(cadeira: Cadeira) {
    this.nome_disciplina = cadeira.nome_disciplina;
    this.nome_professor = cadeira.nome_professor;
    this.numero_vagas = cadeira.numero_vagas;
    this.carga_horaria = cadeira.carga_horaria;
    this.departamento_ofertante = cadeira.departamento_ofertante;
    var horarios = new Array<Array<number>>();
    horarios.push(Array.from(cadeira.horarios.get("seg")));
    horarios.push(Array.from(cadeira.horarios.get("ter")));
    horarios.push(Array.from(cadeira.horarios.get("qua")));
    horarios.push(Array.from(cadeira.horarios.get("qui")));
    horarios.push(Array.from(cadeira.horarios.get("sex")));
    horarios.push(Array.from(cadeira.horarios.get("sab")));    
    this.horarios = horarios;
    this.alunos = Array.from(cadeira.alunos);
  }

  clean(): void {
  }
}