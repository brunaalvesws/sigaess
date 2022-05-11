const { Given, When, Then, And } = require("@cucumber/cucumber");
const { browser, $, element, ElementArrayFinder, by, driver, ExpectedConditions } = require('protractor');

import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

When(/^Clico no botão de adicionar nova cadeira$/, async () => {
    await element(by.buttonText('Adicionar Nova Cadeira')).click();
    await expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/criarCadeira');
});

When(/^Adiciono o nome da disciplina "([^\"]*)", o departamento "([^\"]*)", o total de vagas "([^\"]*)" e marco os horários "([^\"]*)"$/, async (nome, departamento, total_vagas, horarios) => {
    await $("input[name='namebox']").sendKeys(<string> nome);
    await element(by.tagName("select#departamentoSelect")).click();
    await element(by.cssContainingText('option', departamento)).click();
    await $("input[name='totalvagasbox']").sendKeys(<string> total_vagas);
    if (horarios != " ") {
        var horas: string[] = horarios.split(", ");
        for (var hora of horas) {
            await element(by.id(hora)).click();
        }
    }    
})

When(/^Clico no botão de finalizar nova cadeira$/, async () => {
    await element(by.buttonText('Finalizar')).click();
});

Then(/^Vejo uma mensagem de confirmação do cadastro da cadeira$/, async () => {
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Cadeira Criada com Sucesso!')
    await ale.accept();
});

Then(/^Vejo uma mensagem de falha por horário repetido$/, async () => {
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Estes horários já foram preenchidos, tente novamente')
    await ale.accept();
});

Then(/^Vejo uma mensagem de falha por nome repetido$/, async () => {
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Cadeira Já Cadastrada')
    await ale.accept();
});

Then(/^Vejo uma mensagem de falha por nome inválido$/, async () => {
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Nome da Disciplina Inválido')
    await ale.accept();
});

Then(/^Vejo uma mensagem de falha por total de vagas inválido$/, async () => {
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Numero de Vagas Inválido')
    await ale.accept();
});

Then(/^Vejo uma mensagem de falha por horário inválido$/, async () => {
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Horário inválido')
    await ale.accept();
});

