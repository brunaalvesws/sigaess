import { Injectable } from '@angular/core';
import { Aluno } from './aluno';
import { Cadeira } from "./cadeiras";

@Injectable()
export class CadeiraService {
  cadeiras: Cadeira[] = [];
  departamentos: Set<string> = new Set<string>(["CAC",
                                                "CB",
                                                "CCEN",
                                                "CCJ",
                                                "CCS",
                                                "CCM",
                                                "CCSA",
                                                "CE",
                                                "CFCH",
                                                "CIn",
                                                "CTG"]);

  criar(cadeira: Cadeira): Cadeira | string {
    cadeira = cadeira.clone();
    var result_check = this.checkCriar(cadeira);
    if (result_check == "ok") {
      this.cadeiras.push(cadeira);
      if (!this.departamentos.has(cadeira.departamento_ofertante)) {
        this.departamentos.add(cadeira.departamento_ofertante);
      }
      return cadeira;
    }
    return result_check;
  }
  
  checkCriar(cadeira: Cadeira): string {
    if (!this.cadeiraNaoCadastrada(cadeira.nome_disciplina)) {
      return "Cadeira Já Cadastrada";
    } if (!this.validNomeDisc(cadeira.nome_disciplina)) {
      return "Nome da Disciplina Inválido";
    } if (!this.validNomeProf(cadeira.nome_professor)) {
      return "Nome de Professor Inválido";
    } if (!this.validNumVagas(cadeira.numero_vagas)) {
      return "Numero de Vagas Inválido";
    } if (!this.validCargHoraria(cadeira.carga_horaria)) {
      return "Horário inválido";
    } if (!this.validHorarios(cadeira)) {
      return "Estes horários já foram preenchidos, tente novamente";
    }
    return "ok";
  }

  validHorarios(novaCadeira: Cadeira): boolean {
    for (let cadeira of this.cadeiras){
      if (cadeira.nome_professor == novaCadeira.nome_professor){
        for (var key in cadeira.horarios){ 
          var alocacaoAtual = cadeira.horarios[key];
          var novaAlocacao = novaCadeira.horarios[key];
          if (equal(alocacaoAtual, novaAlocacao) || interseccao(alocacaoAtual, novaAlocacao)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  validCargHoraria(num: number): boolean {
    if (!Number.isInteger(num) || num <= 0) {
      return false;
    }
    return true;
  }

  validNomeDisc(nome_disciplina: string): boolean {
    if (nome_disciplina.replace(/\s/g, '') == "") {
      return false;
    }
    return true;
  }

  validNomeProf(nome_professor: string): boolean {
    if (nome_professor.replace(/\s/g, '') == "") {
      return false;
    }
    return true;
  }

  validNumVagas(num_str: string) {
    if (Number.isNaN(num_str)) {
      return false;
    } 
    const num = Number(num_str);
    if (!Number.isInteger(num) || num <= 0) {
      return false;
    }
    return true;
  }

  cadeiraNaoCadastrada(nome_disciplina: string): boolean {
    return !this.cadeiras.find(a => a.nome_disciplina == nome_disciplina);
  }

  atualizarAlunos(cadeira: Cadeira): void {
    cadeira = cadeira.clone();
    for (let c of this.cadeiras)
      if (c.nome_disciplina == cadeira.nome_disciplina) {
        c.alunos = cadeira.alunos;
      }
  }
  
  getCadeiras(departamento_ofertante=""): Cadeira[] {
    var result: Cadeira[] = [];
    for (let c of this.cadeiras) {
      if (departamento_ofertante=="" || c.departamento_ofertante==departamento_ofertante) {
        result.push(c.clone());
      }
    }
    return result;
  }

  getCadeira(nome: string): Cadeira | null {
    var result = this.cadeiras.find(a => {
      a.nome_disciplina == nome;
    })
    return result;
  }

  getDepartamentos(): string[] {
    var result: string[] = [];
    this.departamentos.forEach(d => {
      result.push(d);
    })
    return result;
  }

  getTable(): Map<string,Cadeira[]> {
    var result: Map<string,Cadeira[]> = new Map<string,Cadeira[]>();
    this.departamentos.forEach(d => {
      result.set(d, this.getCadeiras(d)) ;
    })
    return result;
  }

  addAluno(cadeira: Cadeira, aluno: Aluno): boolean {
    cadeira = cadeira.clone();
    var result = false;
    for (let c of this.cadeiras) {
      if (c.nome_disciplina == cadeira.nome_disciplina) {
        result = c.addAluno(aluno);
        return result;
      }
    }
    return result;
  }
}


function equal(arg0: Set<number>, arg1: Set<number>) {
  if (arg0.size !== arg1.size) return false;
  if (arg0.size == 0 &&  arg1.size == 0) return false;
  for (var a of arg0) if (!arg1.has(a)) return false;
  return true;
}

function interseccao(setA: Set<number>, setB: Set<number>): boolean {
  var _interseccao = new Set();
  for (var elem of setB) {
      if (setA.has(elem)) {
          _interseccao.add(elem);
      }
  }
  return _interseccao.size !== 0;
}


