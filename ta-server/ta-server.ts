import express = require('express');
import bodyParser = require("body-parser");

import {Pessoa} from '../common/pessoa';
import {CadastroDePessoas} from './cadastrodepessoa';
import { CadastroDeCadeiras } from './cadastrodecadeiras';
import { Cadeira, CadeiraPackage } from '../common/cadeiras';

var taserver = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

taserver.use(allowCrossDomain);

taserver.use(express.json());

// Requisições de aluno

var alunos: CadastroDePessoas = new CadastroDePessoas();

taserver.get('/alunos', function (req, res) {
  var aluno: string = JSON.stringify(alunos.getPessoas());
  res.send(aluno);
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  console.log("I received a /aluno post")
  var aluno: Pessoa = <Pessoa> req.body; //verificar se é mesmo Aluno!
  aluno = alunos.criar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Pessoa = <Pessoa> req.body;
  aluno = alunos.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

// Requisições de Professor

taserver.get('/professores', function (req, res) {
  var professor: string = JSON.stringify(alunos.getPessoas());
  res.send(professor);
})

taserver.post('/professor', function (req: express.Request, res: express.Response) {
  var professor: Pessoa = <Pessoa> req.body; //verificar se é mesmo professor!
  professor = alunos.criar(professor);
  if (professor) {
    res.send({"success": "O professor foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O professor não pode ser cadastrado"});
  }
})

taserver.put('/professor', function (req: express.Request, res: express.Response) {
  var professor: Pessoa = <Pessoa> req.body;
  professor = alunos.atualizar(professor);
  if (professor) {
    res.send({"success": "O professor foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O professor não pode ser atualizado"});
  }
})

// Requisições de Cadeiras

var cadeiras: CadastroDeCadeiras = new CadastroDeCadeiras();

taserver.get('/cadeiras', function (req, res) {
  console.log("I receave a /cadeiras get");
  var result_cadeiras: string = JSON.stringify(cadeiras.getCadeirasPackages());
  res.send(result_cadeiras);
})

taserver.post('/cadeira', function (req: express.Request, res: express.Response) {
  // Lembrar de colocar pra ele retornar a string do criar 
  // cadeira para quando dá errado
  console.log("I receave a /cadeira post");
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

taserver.put('/cadeira', function (req: express.Request, res: express.Response) {
  console.log("I receave a /cadeira put")
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

taserver.put('/cadeiraAddAluno', function (req: express.Request, res: express.Response) {
  console.log("I receave a /cadeiraAddAluno put")
  var cadeiraPackage: CadeiraPackage = <CadeiraPackage> req.body.cadeira;
  var aluno: Pessoa = <Pessoa> req.body.aluno;
  var cadeira = new Cadeira();
  cadeira.copyFromDataPackage(cadeiraPackage);
  var result = cadeiras.addAluno(cadeira, aluno);
  if (result) {
    res.send({"success": "A cadeira foi atualizada com sucesso"});
  } else {
    res.send({"failure": "A cadeira não pode ser atualizada"});
  }
})

taserver.get('/departamentos', function (req: express.Request, res: express.Response) {
  var departamentos: string = JSON.stringify(cadeiras.getDepartamentos());
  res.send(departamentos);
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
