import request = require("request-promise");
import { closeServer } from '../siga-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../siga-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de usuarios vazia", () => {
    return request.get(base_url + "usuarios")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  });

  it("cadastra pessoas corretamente", () => {
   var corpo = {"json":{"uid":"","name":"Bruna Alves","email":"baws@cin.ufpe.br","senha":"bruna123123","role":"a","horarios":{"seg":{},"ter":{},"qua":{},"qui":{},"sex":{},"sab":{}}}};
   return request.post(base_url + "usuario", corpo)
            .then(body =>
               expect(body).toEqual({success: "O usuário foi cadastrado com sucesso"})
            ).catch(e =>
               expect(e).toEqual(null)
            )
 });

  it("só cadastra pessoas com role definido", () => {
    var corpo = {"json":{"uid":"","name":"Bruna Wanderçey","email":"bwas@cin.ufpe.br","senha":"bruna123123","role":"","horarios":{"seg":{},"ter":{},"qua":{},"qui":{},"sex":{},"sab":{}}}};
    return request.post(base_url + "usuario", corpo)
             .then(body =>
                expect(body).toEqual({failure: "O usuário não pode ser cadastrado"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });


  it("não cadastra alunos com Email duplicado", () => {
    var usuario1 = {"json":{"uid":"","name":"Filipe Melo","email":"fgm3@cin.ufpe.br","senha":"filipe123123","role":"p","horarios":{"seg":{},"ter":{},"qua":{},"qui":{},"sex":{},"sab":{}}}};
    var usuario2 = {"json":{"uid":"","name":"Bruna Alves","email":"fgm3@cin.ufpe.br","senha":"bruna123123","role":"a","horarios":{"seg":{},"ter":{},"qua":{},"qui":{},"sex":{},"sab":{}}}};
    var resposta1 = '{"uid":"","name":"Filipe Melo","email":"fgm3@cin.ufpe.br","senha":"filipe123123","role":"p","horarios":{"seg":{},"ter":{},"qua":{},"qui":{},"sex":{},"sab":{}}}';
    var resposta2 = '{"uid":"","name":"Bruna Alves","email":"fgm3@cin.ufpe.br","senha":"bruna123123","role":"a","horarios":{"seg":{},"ter":{},"qua":{},"qui":{},"sex":{},"sab":{}}}';

    return request.post(base_url + "usuario", usuario1)
             .then(body => {
                expect(body).toEqual({success: "O usuário foi cadastrado com sucesso"});
                return request.post(base_url + "usuario", usuario2)
                         .then(body => {
                            expect(body).toEqual({failure: "O usuário não pode ser cadastrado"});
                            return request.get(base_url + "usuarios")
                                     .then(body => {
                                        expect(body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                      });
                          });
              })
              .catch(err => {
                 expect(err).toEqual(null)
              });
 });

   it("cadastra cadeiras válidas corretamente", () => {
      var corpo = {"json":{"nome_disciplina":"Introdução à Programação","nome_professor":"Filipe Melo","numero_vagas":60,"carga_horaria":10,"departamento_ofertante":"CIn","horarios":[[8,9],[8,9],[8,9,13,14],[],[8,9],[]],"alunos":[""]}};
      return request.post(base_url + "cadeira", corpo)
               .then(body =>
                  expect(body).toEqual({success: "A cadeira foi cadastrada com sucesso"})
               ).catch(e =>
                  expect(e).toEqual(null)
               )
   });

   it("não cadastra cadeiras com nome duplicado", () => {
      var cadeira1 = {"json":{"nome_disciplina":"Infra de Hardware","nome_professor":"Adriano","numero_vagas":60,"carga_horaria":10,"departamento_ofertante":"CIn","horarios":[[8,9],[14],[11],[11],[10],[]],"alunos":[""]}};
      var cadeira2 = {"json":{"nome_disciplina":"Infra de Hardware","nome_professor":"Adriano","numero_vagas":60,"carga_horaria":10,"departamento_ofertante":"CIn","horarios":[[],[10],[10,16],[],[11],[]],"alunos":[""]}};
      var resposta1 = '{"nome_disciplina":"Infra de Hardware","nome_professor":"Adriano","numero_vagas":60,"carga_horaria":10,"departamento_ofertante":"CIn","horarios":[[8,9],[14],[11],[11],[10],[]],"alunos":[""]}';
      var resposta2 = '{"nome_disciplina":"Infra de Hardware","nome_professor":"Adriano","numero_vagas":60,"carga_horaria":10,"departamento_ofertante":"CIn","horarios":[[],[10],[10,16],[],[11],[]],"alunos":[""]}';
  
      return request.post(base_url + "cadeira", cadeira1)
               .then(body => {
                  expect(body).toEqual({success: "A cadeira foi cadastrada com sucesso"});
                  return request.post(base_url + "cadeira", cadeira2)
                           .then(body => {
                              expect(body).toEqual({failure:"Cadeira Já Cadastrada"});
                              return request.get(base_url + "cadeiras")
                                       .then(body => {
                                          expect(body).toContain(resposta1);
                                          expect(body).not.toContain(resposta2);
                                        });
                            });
                })
                .catch(err => {
                   expect(err).toEqual(null)
                });
   });

   it("matricula um aluno em uma cadeira corretamente", () => {
      var corpo = {"json":{"aluno":{"uid":"","name":"Bruna Alves","email":"baws@cin.ufpe.br","senha":"bruna123123","role":"a","horarios":{}},
                           "cadeira":{"nome_disciplina":"Introdução à Programação","nome_professor":"Filipe Melo","numero_vagas":60,"carga_horaria":10,"departamento_ofertante":"CIn","horarios":[[8,9],[8,9],[8,9,13,14],[],[8,9],[]],"alunos":[""]}}};
      return request.put(base_url + "cadeiraAddAluno", corpo)
               .then(body =>
                  expect(body).toEqual({success: "Matricula realizada com sucesso"})
               ).catch(e =>
                  expect(e).toEqual(null)
               )
   });

   it("não matricula um aluno em uma cadeira se há conflito de horário", () => {
      var corpo = {"json":{"aluno":{"uid":"","name":"Bruna Alves","email":"baws@cin.ufpe.br","senha":"bruna123123","role":"a","horarios":{}},
                           "cadeira":{"nome_disciplina":"Infra de Hardware","nome_professor":"Adriano","numero_vagas":60,"carga_horaria":10,"departamento_ofertante":"CIn","horarios":[[8,9],[14],[11],[11],[10],[]],"alunos":[""]}}};
      return request.put(base_url + "cadeiraAddAluno", corpo)
               .then(body =>
                  expect(body).toEqual({failure: "Falha na matricula: conflito de horários"})
               ).catch(e =>
                  expect(e).toEqual(null)
               )
   });

})