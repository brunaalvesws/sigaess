as um estudante
i quero adicionar matérias à minha grade de horário
to eu faça a matrícula na minha instituição de ensino

Scenario: Aluno Acessa a Área de Matrícula
	Given que eu sou um aluno que está na tela inicial do sistema
	And eu visualizo a opção de matrícula 
	When eu clico no botão de matrícula
	Then eu sou movido até a área de matrícula
	And visualizo um menu dropdown de seleção de matérias
	And visualizo meus dados pessoais 
	And visualizo uma grade de horário vazia
	And visualizo um botão de cancelar na área de matrícula
	And visualizo um botão de confirmar na área de matrícula

Scenario: Aluno Utiliza Menu de Seleção de Matérias
	Given que eu estou na área de matrícula
	When eu clico no menu dropdown de seleção de matérias
	Then Eu visualizo uma lista de matérias
	And visualizo seus respectivos códigos
	When Seleciono a matéria ESS
	Then uma janela pop-up com dados sobre a matéria são visualizados sobre a área de matrícula
	And visualizo a opção de cancelar na janela de pop up
	And visualizo a opção de confirmar na janela de pop up

Scenario: Aluno Confirma Matéria
	Given que eu estou na janela de pop-up com informações sobre a matéria ESS
	When eu clico a opção de confirmar matéria
	Then a janela de de pop-up é fechada
	And eu retorno à área de matrícula 
	And a grade de horário possui a matéria ESS adicionada

Scenario: Aluno Remove Matéria
	Given que eu estou na área de matrícula
	And visualizo a matéria ESS na grade de horário
	When eu clico na opção de remoção representada pelo X
	Then a matéria ESS não está mais presente na grade de horário

Scenario: Aluno Confirma Sua Matrícula
   Given que eu estou na área de matrícula
	And há matérias de ESS e GDI na grade de horário 
	When eu clico a opção de confirmar localizada na área matrícula
	Then sou levado à uma nova janela
	And visualizo que estou matriculado nas matérias adicionadas na grade de horário
	And visualizo as informações referentes às matérias matriculadas
	And visualizo um botão de retorno à tela inicial
	Then o status de matrículado fica visível
	
Scenario: Aluno Retorna a Página Inicial
	Given que eu estou na tela de confirmação de matricula
	And eu fui devidamente matriculado
	When eu clico botão de retornar
	Then eu retorno para tela inicial 

Scenario: Aluno Cancela Seleção de Matéria
	Given que eu estou visualizando o pop-up de matéria
	And não quero adicionar tal matéria
	When eu clico no botão cancelar
	Then a janela de pop-up é fechada
	And eu retorno para a área de matrícula
