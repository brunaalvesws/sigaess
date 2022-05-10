const { Given, When, Then, And } = require("@cucumber/cucumber");
const { browser, $, element, ElementArrayFinder, by } = require('protractor');
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


Given(/^Estou na página de autenticação de usuários$/, async () => {
    await browser.get("http://localhost:4200/usuario");
    await expect(browser.getTitle()).to.eventually.equal('Siga');
})


When(/^Clico no botão de Cadastrar$/, async (name, cpf) => {
    await element(by.buttonText('Cadastrar')).click();
});

And(/^Adiciono o email "([^\"]*)", o nome "([^\"]*)", a senha "([^\"]*)" e escolho o tipo "Aluno"$/, async (email, nome, senha) => {
    await $("input[name='userName']").sendKeys(<string> nome);
    await $("input[name='userEmail']").sendKeys(<string> email);
    await $("input[name='userSenha']").sendKeys(<string> senha);
    await element(by.tagName("select#userType")).click();
    await element(by.cddContainingText('option', 'Aluno')).click();
    await element(by.buttonText('Cadastrar')).click();
})

Then(/^Continuo na tela de cadastro de usuários$/, async () => {
    await browser.get("http://localhost:4200/cadastro");
    await expect(browser.getTitle()).to.eventually.equal('Siga');
});

And(/^Vejo uma mensagem de confirmação do cadastro$/, async () => {
    let ale: Alert = browser.switchTo().alert();
    await expect(ale.getText()).to.eventually.equal('Cadastro realizado! Faça Login!')
    
});