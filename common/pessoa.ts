import { Cadeira } from "./cadeiras";

export class Pessoa {
  uid: string;
  name: string;
  email: string;
  senha: string;
  role: string;
  horarios: Map<string, Map<number, string>>;

  constructor (
    uid: string = "",
    name: string = "",
    email: string = "",
    role: string = "",
    horarios: Map<string, Map<number, string>> = undefined) {
      
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.role = role;
    if (horarios) {
      this.horarios = horarios;
    } else {
      this.horarios = this.horariosInitial()
    }
  }

  clean(): void {
    this.name = "";
    this.email = "";
    this.senha = "";
    this.role = "";
    this.horarios = this.horariosInitial();
  }

  horariosInitial(): Map<string, Map<number, string>> {
    var  horarios: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
    horarios.set("seg", new Map<number, string>());
    horarios.set("ter", new Map<number, string>());
    horarios.set("qua", new Map<number, string>());
    horarios.set("qui", new Map<number, string>());
    horarios.set("sex", new Map<number, string>());
    horarios.set("sab", new Map<number, string>());
    return horarios;
  }

  cloneHorarios(): Map<string, Map<number, string>> {
    var horarios: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
    horarios = new Map(JSON.parse(JSON.stringify([...this.horarios])))
    return horarios;
  }

  copyFrom(from: Pessoa): void {
    this.name = from.name;
    this.email = from.email;
    this.role = from.role;
    this.senha = from.senha;
  }

  clone(): Pessoa {
    var pessoa: Pessoa = new Pessoa();
    pessoa.name = this.name;
    pessoa.email = this.email;
    pessoa.senha = this.senha;
    pessoa.role = this.role;
    pessoa.horarios = this.cloneHorarios();
    return pessoa;
  }

  toString() {
    return this.uid + ', ' + this.name + ', ' + this.email + ', ' + this.role + ', ' + JSON.stringify(this.horarios);
  }

  createDataPackage(): PessoaPackage {
    var pessoaPackage = new PessoaPackage(this);
    return pessoaPackage;
  }

  objToMap(obj: Object): Map<any, any> {
    if (obj instanceof Object) {
      var m = new Map<any, any>();
      for (const [k, v] of Object.entries(obj)) {
        m.set(k, this.objToMap(v))
      }
      return m
    } else {
      return obj
    }
  }

  addCadeira(cadeira: Cadeira): void {
    cadeira.horarios.forEach((value: Set<number>, key: string) => {
      value.forEach((inner_value: number) => {
        this.horarios.get(key).set(inner_value, cadeira.nome_disciplina);
      });
    });
  }

  copyFromDataPackage(pessoaPackage: PessoaPackage): void {
    this.uid = pessoaPackage.uid;
    this.name = pessoaPackage.name;
    this.email = pessoaPackage.email;
    this.senha = pessoaPackage.senha;
    this.role = pessoaPackage.role; 
    this.horarios = this.objToMap(pessoaPackage.horarios);
  }
}

export class PessoaPackage {
  uid: string;
  name: string;
  email: string;
  senha: string;
  role: string;
  horarios: {};

  constructor(pessoa: Pessoa) {
    this.uid = pessoa.uid;
    this.name = pessoa.name;
    this.email = pessoa.email;
    this.senha = pessoa.senha;
    this.role = pessoa.role; 
    this.horarios = this.mapToObj(pessoa.horarios);
  }

  mapToObj(map: any) {
    if (map instanceof Map) {
      var m = {};
      map.forEach((value, key) => {  
        m[key] = this.mapToObj(value)
      });
      return m
    } else {
      return map
    }
  }

  clean(): void {
  }
}
