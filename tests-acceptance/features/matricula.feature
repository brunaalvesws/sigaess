Feature: Teste matricula

Scenario: Matricula em uma cadeira
Given Estou na página de autenticação de usuários
Given Criei um usuário com o email "fgmA@cin.com", o nome "Filipe Melo A", a senha "filipe12345" e escolhi o tipo Professor
When Tento fazer login com email "fgmA@cin.com" e senha "filipe12345"
Then Vou para a tela inicial do usuário
Then Estou logado como Professor
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina "Introdução a Programação 3", o departamento "CIn", o total de vagas "60" e marco os horários "seg8, seg9, qua10, qua11"
When Clico no botão de finalizar nova cadeira
Then Vejo uma mensagem de confirmação do cadastro da cadeira
Then Vou para a tela inicial do usuário
When Clico no botão de LogOut
Then Estou na página de autenticação de usuários
Given Criei um usuário com o email "bawsB@cin.com", o nome "Bruna", a senha "bruna12345" e escolhi o tipo Aluno
When Tento fazer login com email "bawsB@cin.com" e senha "bruna12345"
Then Vou para a tela inicial do usuário
Then Estou logado como Aluno
When Seleciono o departamento "CIn" e a cadeira "Introdução a Programação 3"
When Clico no botão Selecionar
When Clico no botão Matricular 
Then Vejo uma mensagem de confirmação da matrícula