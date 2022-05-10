const { Given, When, Then, And } = require("@cucumber/cucumber");
const { browser, $, element, ElementArrayFinder, by } = require('protractor');
import { ExpectedConditions } from 'protractor';
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


Given(/^Criei um usuário com o email "([^\"]*)", o nome "([^\"]*)", a senha "([^\"]*)" e escolhi o tipo Aluno$/, async (email, nome, senha) => {
    await element(by.buttonText('Cadastrar')).click();
    await $("input[name='userName']").sendKeys(<string> nome);
    await $("input[name='userEmail']").sendKeys(<string> email);
    await $("input[name='userSenha']").sendKeys(<string> senha);
    await element(by.tagName("select#userType")).click();
    await element(by.cssContainingText('option', 'Aluno')).click();
    await element(by.buttonText('Cadastrar')).click();
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Cadastro realizado! Faça Login!')
    await ale.accept();
})

When(/^Tento fazer login com email "([^\"]*)" e senha "([^\"]*)"$/, async (email, senha) => {
    await $("input[name='namebox']").sendKeys(<string> email);
    await $("input[name='passbox']").sendKeys(<string> senha);
    await element(by.buttonText('Fazer Login')).click();
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Login efetuado! Seja bem vindo!')
    await ale.accept();
})

Then(/^Vou para a tela inicial do usuário$/, async () => {
    await expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/cadeiras');
});

Then(/^Estou logado como Aluno$/, async () => {
    let b = await element(by.css('.teste'));
    await expect(b.isPresent()).to.eventually.equal(false);
});