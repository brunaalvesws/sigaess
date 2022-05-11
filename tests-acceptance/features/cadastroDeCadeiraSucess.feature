Feature: Teste cadastro de cadeira

Scenario: Cadastrar nova cadeira
Given Estou na página de autenticação de usuários
Given Criei um usuário com o email "fgm4@cin.com", o nome "Filipe Melo", a senha "filipe12345" e escolhi o tipo Professor
Given Tento fazer login com email "fgm4@cin.com" e senha "filipe12345"
Given Vou para a tela inicial do usuário
Given Estou logado como Professor
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina "Introdução a Programação", o departamento "CIn", o total de vagas "60" e marco os horários "seg8, seg9, qua10, qua11"
When Clico no botão de finalizar nova cadeira
Then Vejo uma mensagem de confirmação do cadastro da cadeira
Then Vou para a tela inicial do usuário