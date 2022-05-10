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

// Requisições de usuario

var usuarios: CadastroDePessoas = new CadastroDePessoas();

sigaserver.get('/usuarios', function (req, res) {
  var usuario: string = JSON.stringify(usuarios.getCadeirasPackages());
  res.send(usuario);
})

sigaserver.post('/usuario', function (req: express.Request, res: express.Response) {
  var usuarioPackage: PessoaPackage = <PessoaPackage> req.body;
  if (req.body.role != "") {
    var usuario = new Pessoa;
    usuario.copyFromDataPackage(usuarioPackage);
    usuario = usuarios.criar(usuario);
    if (usuario) {
      res.send({"success": "O usuário foi cadastrado com sucesso"});
    } else {
      res.send({"failure": "O usuário não pode ser cadastrado"});
    }
  } else {
    res.send({"failure": "O usuário não pode ser cadastrado"});
  }
})

sigaserver.put('/usuario', function (req: express.Request, res: express.Response) {
  var usuarioPackage: PessoaPackage = <PessoaPackage> req.body;
  var usuario = new Pessoa;
  usuario.copyFromDataPackage(usuarioPackage)
  usuario = usuarios.atualizar(usuario);
  if (usuario) {
    res.send({"success": "O usuário foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O usuário não pode ser atualizado"});
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

sigaserver.put('/cadeiraAddusuario', function (req: express.Request, res: express.Response) {
  var cadeiraPackage: CadeiraPackage = <CadeiraPackage> req.body.cadeira;
  var usuario: Pessoa = <Pessoa> req.body.usuario;
  var cadeira = new Cadeira();
  cadeira.copyFromDataPackage(cadeiraPackage);
  var pessoa_aux = new Pessoa();
  pessoa_aux.copyFrom(usuario);
  var pessoa = usuarios.getWithEmail(pessoa_aux.email);
  if (usuarios.checkAddHorario(pessoa, cadeira)) {
    var result = cadeiras.addAluno(cadeira, usuario);
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
