Scenario: Disciplina cadastrada sem conflito
    Given: Estou na tela de disciplinas cadastradas
    And: Estou logado como "Professor"
    And: Não vejo disciplinas cadastradas
    When: Eu tento cadastrar a disciplina "Economia", com horário "segunda 8-10 e sexta 10-12" e turma "18-A"
    Then: A disciplina de nome "Economia" é corretamente armazenada e eu vejo uma mensagem de sucesso informando que o cadastro foi efetuado corretamente
 
Scenario: Tentativa de cadastrar disciplina que conflita com outra
    Given: Estou na tela de disciplinas cadastradas
    And: Estou logado como "Professor"
    And: Vejo apenas uma disciplina cadastradas, chamada "Economia", com horário "segunda 8-10 e sexta 10-12" e turma "18-A"
    When: Eu tento cadastrar uma nova disciplina chamada "SI", com horário "segunda 8-10 e sexta 10-12" e turma "10-A"
    Then: Eu vejo uma mensagem de erro informando que o cadastro não pode ser efetuado corretamente, pois os horários das disciplinas "Economia" e "SI" conflitam

Scenario: Cadastro de disciplinas com o mesmo título
    Given: Estou na tela de disciplinas cadastradas
    And: Estou logado como "Professor"
    And: Vejo apenas uma disciplina cadastradas, chamada "Economia", com horário "segunda 8-10 e sexta 10-12" e turma "18-A"
    When: Eu tento cadastrar uma nova disciplina chamada "Economia", com horário "terça 10-12 e quinta 8-10" e turma "12-C"
    Then: A disciplina de nome "Economia" é corretamente armazenada e o sistema possui duas disciplinas com o mesmo nome

Scenario: Cadastro de disciplinas para a mesma turma
    Given: Estou na tela de disciplinas cadastradas
    And: Estou logado como "Professor"
    And: Vejo apenas uma disciplina cadastradas, chamada "Economia", com horário "segunda 8-10 e sexta 10-12" e turma "18-A"
    When: Eu tento cadastrar uma nova disciplina chamada "Algoritmos", com horário "terça 10-12 e quinta 8-10" e turma "18-A"
    Then: A disciplina de nome "Algoritmos" é corretamente armazenada e o sistema possui duas disciplinas com o mesma turma

Scenario: Cadastro de disciplinas com mesmos nome e turma  
    Given: Estou na tela de disciplinas cadastradas
    And: Estou logado como "Professor"
    And: Vejo apenas uma disciplina cadastradas, chamada "Artes", com horário "segunda 8-10 e sexta 10-12" e turma "18-A"
    When: Eu tento cadastrar uma nova disciplina chamada "Artes", com horário "terça 10-12 e quinta 8-10" e turma "18-A"
    Then: A nova disciplina de nome "Artes" é corretamente armazenada e o sistema possui duas disciplinas para a turma "18-A"
