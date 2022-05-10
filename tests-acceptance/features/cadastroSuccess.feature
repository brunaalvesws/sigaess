Feature: Teste cadastro

Scenario: Cadastrar novo usuário
Given Estou na página de autenticação de usuários
When Clico no botão de Cadastrar
When Adiciono o email "baws0@cin.com", o nome "Bruna", a senha "bruna12345" e escolho o tipo Aluno
Then Vejo uma mensagem de confirmação do cadastro
Then Continuo na tela de cadastro de usuários