//Nos baseamos nesses cenários para os testes porém o login agora é 
feito com email e não cpf

Scenario: Fazer login com credenciais de aluno 
Given Estou na página de autenticação de usuários
And Criei um usuário com o email “baws@cin.com”, o nome "Bruna", a senha "bruna12345" e escolhi o tipo "Aluno"
When Tento fazer login com email “baws@cin.com” e senha "bruna12345"
Then Vou para a tela inicial do usuário
And Estou logado como Aluno





