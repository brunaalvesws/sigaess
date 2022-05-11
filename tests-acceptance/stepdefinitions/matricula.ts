const { Given, When, Then, And } = require("@cucumber/cucumber");
const { browser, $, element, ElementArrayFinder, by, driver, ExpectedConditions } = require('protractor');

import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

When(/^Clico no botão de LogOut$/, async () => {
    await $("a[name='logout']").click();
});

When(/^Seleciono o departamento "([^\"]*)" e a cadeira "([^\"]*)"$/, async (departamento, nome) => {
    await element(by.tagName("select#selectDepartamento")).click();
    await element(by.cssContainingText('option', departamento)).click();
    await element(by.tagName("select#selectCadeira")).click();
    await element(by.cssContainingText('option',nome)).click();
})

When(/^Clico no botão Selecionar$/, async () => {
    await element(by.buttonText('Selecionar')).click();
});

When(/^Clico no botão Matricular$/, async () => {
    await element(by.buttonText('Matricular')).click();
});

Then(/^Vejo uma mensagem de confirmação da matrícula$/, async () => {
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Matricula realizada com sucesso');
    await ale.accept();
});