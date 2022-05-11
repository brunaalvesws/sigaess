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

Scenario: Cadastro de cadeiras com horários coincidentes (mesmo Professor)
Given Estou na página de autenticação de usuários
Given Criei um usuário com o email "fgm5@cin.com", o nome "Filipe Gomes", a senha "filipe12345" e escolhi o tipo Professor
Given Tento fazer login com email "fgm5@cin.com" e senha "filipe12345"
Given Vou para a tela inicial do usuário
Given Estou logado como Professor
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina "Matemática Discreta", o departamento "CIn", o total de vagas "60" e marco os horários "seg8, seg9, qua10, qua11"
When Clico no botão de finalizar nova cadeira
When Vejo uma mensagem de confirmação do cadastro da cadeira
When Vou para a tela inicial do usuário
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina "AVLC", o departamento "CIn", o total de vagas "60" e marco os horários "seg9, seg10, qua9, qua10"
When Clico no botão de finalizar nova cadeira
Then Vejo uma mensagem de falha por horário repetido

Scenario: Cadastrar de cadeiras com nome repetido
Given Estou na página de autenticação de usuários
Given Criei um usuário com o email "fgm6@cin.com", o nome "Filipe Gomes Melo", a senha "filipe12345" e escolhi o tipo Professor
Given Tento fazer login com email "fgm6@cin.com" e senha "filipe12345"
Given Vou para a tela inicial do usuário
Given Estou logado como Professor
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina "Introdução a Computação", o departamento "CIn", o total de vagas "60" e marco os horários "seg8, seg9, qua10, qua11"
When Clico no botão de finalizar nova cadeira
When Vejo uma mensagem de confirmação do cadastro da cadeira
When Vou para a tela inicial do usuário
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina "Introdução a Computação", o departamento "CIn", o total de vagas "60" e marco os horários "ter9, ter10, qui9, qui10"
When Clico no botão de finalizar nova cadeira
Then Vejo uma mensagem de falha por nome repetido

Scenario: Cadastro de cadeiras com nome vazio
Given Estou na página de autenticação de usuários
Given Criei um usuário com o email "fgm7@cin.com", o nome "Filipe Melo Gomes", a senha "filipe12345" e escolhi o tipo Professor
Given Tento fazer login com email "fgm7@cin.com" e senha "filipe12345"
Given Vou para a tela inicial do usuário
Given Estou logado como Professor
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina " ", o departamento "CIn", o total de vagas "60" e marco os horários "seg8, seg9, qua10, qua11"
When Clico no botão de finalizar nova cadeira
Then Vejo uma mensagem de falha por nome inválido

Scenario: Cadastro de cadeira com total de vagas inválido
Given Estou na página de autenticação de usuários
Given Criei um usuário com o email "fgm8@cin.com", o nome "Filipe Melo Melo", a senha "filipe12345" e escolhi o tipo Professor
Given Tento fazer login com email "fgm8@cin.com" e senha "filipe12345"
Given Vou para a tela inicial do usuário
Given Estou logado como Professor
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina "Cálculo 1", o departamento "CIn", o total de vagas "-10" e marco os horários "seg8, seg9, qua10, qua11"
When Clico no botão de finalizar nova cadeira
Then Vejo uma mensagem de falha por total de vagas inválido

Scenario: Cadastro de cadeiras com horário vazio
Given Estou na página de autenticação de usuários
Given Criei um usuário com o email "fgm9@cin.com", o nome "Filipe Gomes Gomes", a senha "filipe12345" e escolhi o tipo Professor
Given Tento fazer login com email "fgm9@cin.com" e senha "filipe12345"
Given Vou para a tela inicial do usuário
Given Estou logado como Professor
When Clico no botão de adicionar nova cadeira
When Adiciono o nome da disciplina "Cálculo 2", o departamento "CIn", o total de vagas "60" e marco os horários " "
When Clico no botão de finalizar nova cadeira
Then Vejo uma mensagem de falha por horário inválido