import express = require('express');

import { Aluno } from '../common/classes/aluno';
import { CadastroDeAlunos } from './cadastrodealunos';
import { CadastroDeProfessor } from './cadastrodeprofs';
import { LoginService } from './login.service';

var taserver = express();

var cadastroaluno: CadastroDeAlunos = new CadastroDeAlunos();
var cadastroprof: CadastroDeProfessor = new CadastroDeProfessor();
var loginService: LoginService = new LoginService(cadastroaluno, cadastroprof);

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(express.json());


taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastroaluno.getAlunos()));
})

taserver.get('/professores', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastroprof.getProfessores()));
})

taserver.post('/cadastro', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  aluno = cadastroaluno.cadastrar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

taserver.post('/login', function (req: express.Request, res: express.Response) {
  var cpf: string = req.body.cpf; 
  var senha: string = req.body.senha; 
  var login: string;
  login = loginService.loginAluno(cpf, senha)
  if (login == "success") {
    res.send({"success": "Login realizado com sucesso"});
  } else if (login == ("cpferror")) {
    res.send({"failure": "CPF inválido"});
  } else {
    res.send({"failure": "Senha inválida. Tente novamente."})
  }
})

var server = taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { server, closeServer }
