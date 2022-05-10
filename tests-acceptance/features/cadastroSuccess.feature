//Nos baseamos nesses cenários para os testes porém o login agora é 
feito com email e não cpf

Scenario: Cadastrar novo usuário
Given Estou na página de autenticação de usuários
And Não existe nenhum usuário cadastrado com o email “baws@cin.com.br”
When Clico no botão de Cadastrar
And Adiciono o email “baws@cin.com”, o nome "Bruna", a senha "bruna12345" e escolho o tipo "Aluno"
Then Continuo na tela de cadastro de usuários
And Vejo uma mensagem de confirmação do cadastro