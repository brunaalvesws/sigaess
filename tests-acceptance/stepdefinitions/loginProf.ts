const { Given, When, Then, And } = require("@cucumber/cucumber");
const { browser, $, element, ElementArrayFinder, by } = require('protractor');
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


Given(/^Estou na página de autenticação de usuários$/, async () => {
    await browser.get("http://localhost:4200/usuario");
    await expect(browser.getTitle()).to.eventually.equal('Siga');
})

And(/^Criei um usuário com o email "([^\"]*)", o nome "([^\"]*)", a senha "([^\"]*)" e escolho o tipo "Aluno"$/, async (email, nome, senha) => {
    await element(by.buttonText('Cadastrar')).click();
    await $("input[name='userName']").sendKeys(<string> nome);
    await $("input[name='userEmail']").sendKeys(<string> email);
    await $("input[name='userSenha']").sendKeys(<string> senha);
    await element(by.tagName("select#userType")).click();
    await element(by.cddContainingText('option', 'Professor')).click();
    await element(by.buttonText('Cadastrar')).click();
    let ale: Alert = browser.switchTo().alert();
    ale.accept()
})

When(/^Tento fazer login com email "([^\"]*)" e senha "([^\"]*)"$/, async (email, senha) => {
    await $("input[name='namebox']").sendKeys(<string> email);
    await $("input[name='passbox']").sendKeys(<string> senha);
    await element(by.buttonText('Fazer Login')).click();
    let ale: Alert = browser.switchTo().alert();
    ale.accept()
})

Then(/^Vou para a tela inicial do usuário$/, async () => {
    await browser.get("http://localhost:4200/perfil");
    await expect(browser.getTitle()).to.eventually.equal('Siga');
});

And(/^Estou logado como Professor$/, async () => {
    await expect(element(by.buttonText('Adicionar Nova Cadeira')).isPresent()).toBe(true);
});