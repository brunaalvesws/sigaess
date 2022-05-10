const { Given, When, Then, And } = require("@cucumber/cucumber");
const { browser, $, element, ElementArrayFinder, by, ExpectedConditions } = require('protractor');
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;



Given(/^Criei um usuário com o email "([^\"]*)", o nome "([^\"]*)", a senha "([^\"]*)" e escolhi o tipo Professor$/, async (email, nome, senha) => {
    await element(by.buttonText('Cadastrar')).click();
    await $("input[name='userName']").sendKeys(<string> nome);
    await $("input[name='userEmail']").sendKeys(<string> email);
    await $("input[name='userSenha']").sendKeys(<string> senha);
    await element(by.tagName("select#userType")).click();
    await element(by.cssContainingText('option', 'Professor')).click();
    await element(by.buttonText('Cadastrar')).click();
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Cadastro realizado! Faça Login!')
    await ale.accept();
})

Then(/^Estou logado como Professor$/, async () => {
    let b = await element(by.css('.teste'));
    await expect(b.isPresent()).to.eventually.equal(true);
});