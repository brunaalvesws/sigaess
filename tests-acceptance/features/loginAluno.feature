Feature: Teste loginAluno

Scenario: Fazer login com credenciais de aluno 
Given Estou na página de autenticação de usuários
Given Criei um usuário com o email "baws1@cin.com", o nome "Bruna", a senha "bruna12345" e escolhi o tipo Aluno
When Tento fazer login com email "baws1@cin.com" e senha "bruna12345"
Then Vou para a tela inicial do usuário
Then Estou logado como Aluno





