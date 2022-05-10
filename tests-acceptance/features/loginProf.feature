//Nos baseamos nesses cenários para os testes porém o login agora é 
feito com email e não cpf

Scenario: Fazer login com credenciais de professor
Given Estou na página de autenticação de usuários
And Criei um usuário com o email “fgm3@cin.com”, o nome "Filipe", a senha "filipe12345" e escolhi o tipo "Professor"
When Tento fazer login com email “fgm3@cin.com” e senha "filipe12345"
Then Vou para a tela inicial do sistema
And Estou logado como Professor