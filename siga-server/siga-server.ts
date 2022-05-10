import express = require('express');
import bodyParser = require("body-parser");

import {Pessoa, PessoaPackage} from '../common/pessoa';
import {CadastroDePessoas} from './cadastrodepessoa';
import { CadastroDeCadeiras } from './cadastrodecadeiras';
import { Cadeira, CadeiraPackage } from '../common/cadeiras';

var sigaserver = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

sigaserver.use(allowCrossDomain);

sigaserver.use(express.json());

// Requisições de aluno

var alunos: CadastroDePessoas = new CadastroDePessoas();

sigaserver.get('/alunos', function (req, res) {
  var aluno: string = JSON.stringify(alunos.getCadeirasPackages());
  res.send(aluno);
})

sigaserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var alunoPackage: PessoaPackage = <PessoaPackage> req.body;
  if (req.body.role != "") {
    var aluno = new Pessoa;
    aluno.copyFromDataPackage(alunoPackage);
    aluno = alunos.criar(aluno);
    if (aluno) {
      res.send({"success": "O aluno foi cadastrado com sucesso"});
    } else {
      res.send({"failure": "O aluno não pode ser cadastrado"});
    }
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

sigaserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var alunoPackage: PessoaPackage = <PessoaPackage> req.body;
  var aluno = new Pessoa;
  aluno.copyFromDataPackage(alunoPackage)
  aluno = alunos.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

// Requisições de Cadeiras

var cadeiras: CadastroDeCadeiras = new CadastroDeCadeiras();

sigaserver.get('/cadeiras', function (req, res) {
  var result_cadeiras: string = JSON.stringify(cadeiras.getCadeirasPackages());
  res.send(result_cadeiras);
})

sigaserver.post('/cadeira', function (req: express.Request, res: express.Response) {
  // Lembrar de colocar pra ele retornar a string do criar 
  // cadeira para quando dá errado
  var cadeiraPackage: CadeiraPackage = <CadeiraPackage> req.body;
  var cadeira = new Cadeira();
  cadeira.copyFromDataPackage(cadeiraPackage);
  var result = cadeiras.criar(cadeira);
  if (typeof result === "object") {
    res.send({"success": "A cadeira foi cadastrada com sucesso"});
  } else {
    res.send({"failure": result.toString()});
  }
})

sigaserver.put('/cadeira', function (req: express.Request, res: express.Response) {
  var cadeiraPackage: CadeiraPackage = <CadeiraPackage> req.body;
  var cadeira = new Cadeira();
  cadeira.copyFromDataPackage(cadeiraPackage);
  var result = cadeiras.atualizar(cadeira);
  if (result) {
    res.send({"success": "A cadeira foi atualizada com sucesso"});
  } else {
    res.send({"failure": "A cadeira não pode ser atualizada"});
  }
})

sigaserver.put('/cadeiraAddAluno', function (req: express.Request, res: express.Response) {
  var cadeiraPackage: CadeiraPackage = <CadeiraPackage> req.body.cadeira;
  var aluno: Pessoa = <Pessoa> req.body.aluno;
  var cadeira = new Cadeira();
  cadeira.copyFromDataPackage(cadeiraPackage);
  var pessoa_aux = new Pessoa();
  pessoa_aux.copyFrom(aluno);
  var pessoa = alunos.getWithEmail(pessoa_aux.email);
  if (alunos.checkAddHorario(pessoa, cadeira)) {
    var result = cadeiras.addAluno(cadeira, aluno);
    if (result) {
      pessoa.addCadeira(cadeira);
      res.send({"success": "Matricula realizada com sucesso"});
    } else {
      res.send({"failure": "Falha na matricula: não há mais vagas"});
    }
  } else {
    res.send({"failure": "Falha na matricula: conflito de horários"})
  }
})

sigaserver.get('/departamentos', function (req: express.Request, res: express.Response) {
  var departamentos: string = JSON.stringify(cadeiras.getDepartamentos());
  res.send(departamentos);
})

sigaserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
