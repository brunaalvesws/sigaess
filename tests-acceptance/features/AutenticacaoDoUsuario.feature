
GUI Scenarios

Scenario: Fazer login com credenciais de aluno 
Given Estou na página de autenticação de usuários
And Existe um CPF “12345678900” vinculado a um aluno
When Tento fazer login com CPF “12345678900” e senha vinculada a ele
Then Vou para a tela inicial do sistema
And Estou logado como Aluno

Scenario: Fazer login com credenciais de professor
Given Estou na página de autenticação de usuários
And Existe um CPF “00987654321” vinculado a um professor
When Tento fazer login com CPF “00987654321” e senha vinculada a ele
Then Vou para a tela inicial do sistema
And Estou logado como Professor

Scenario: Fazer login com credenciais inválidas
Given Estou na página de autenticação de usuários
When Tento fazer login com CPF “00000000000” e senha que não está vinculada a ele 
Then Continuo na tela de autenticação de usuários
And Vejo uma mensagem de erro de credenciais inválidas

Scenario: Cadastrar novo usuário
Given Estou na página de autenticação de usuários
And Não existe nenhum usuário cadastrado com o CPF “11171115474”
When Clico na opção de Cadastrar Usuários
And Adiciono o CPF “11171115474” e demais dados solicitados
Then Continuo na tela de autenticação de usuários
And Vejo uma mensagem de confirmação do cadastro

Scenario: Falha ao cadastrar novo usuário
Given Estou na página de autenticação de usuários
And Já existe um usuário cadastrado com o CPF “11171115474”
When Clico na opção de Cadastrar Usuários
And Adiciono o CPF “11171115474” e demais dados solicitados
Then Ainda estou na tela de autenticação de usuários
And Vejo uma mensagem de erro de CPF já cadastrado



System Scenarios

Scenario: Tentar fazer login com credenciais inválidas
Given Não há nenhum CPF “12345678900” cadastrado no sistema
When Tento logar com o CPF “12345678900” e a senha “123”
Then O sistema não reconhece as credenciais
And O sistema levanta a mensagem de erro de Credenciais inválidas

Scenario: Cadastrar novo usuário
Given Não há nenhum CPF “12345678900” cadastrado no sistema
When Tento cadastrar um novo usuário com o CPF “12345678900”
Then O sistema possui um usuário cadastrado com o CPF “12345678900”

Scenario: Tentar cadastrar CPF já cadastrado
Given Há um CPF “12345678900” cadastrado no sistema
When Tento cadastrar um novo usuário com o CPF “12345678900”
Then O sistema já possui um usuário cadastrado com o CPF “12345678900”
And Recebo uma mensagem de erro "CPF já cadastrado"
