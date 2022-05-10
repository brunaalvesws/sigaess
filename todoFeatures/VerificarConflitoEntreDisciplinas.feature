GUI Scenarios

Scenario: Matrícula executada sem conflito

Given que estou na tela de “Matrícula”
And eu vejo que a matrícula ainda não foi executada
When eu adicionar a cadeira de “Cálculo 1”, com horário de “8 às 10 nas segundas e quartas” 
And, logo em seguida, tento adicionar a cadeira de "Estatística", com horário de “10 às 12 nas segundas e quartas”
Then eu vejo que a cadeira “Estatística” foi adicionada com sucesso
And continuo na tela de “Matrícula”

	
Scenario: Conflito entre horários durante a matrícula 
		
Given que estou na tela de “Matrícula”
And eu vejo que a matrícula ainda não foi executada
When eu adicionar a cadeira de “Cálculo 1”, com horário de “8 às 10 nas segundas e quartas” 
And, logo em seguida, tento adicionar a cadeira de "Estatística", com horário de “8 às 12 nas segundas e quartas”
Then eu vejo uma mensagem de alerta informando que o horário da cadeira em questão conflita com o horário de outra cadeira já adicionada anteriormente
And continuo na tela de “Matrícula”
And eu posso ver que a cadeira “Estatística” não foi adicionada