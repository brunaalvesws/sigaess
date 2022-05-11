const { Given, When, Then, And } = require("@cucumber/cucumber");
const { browser, $, element, ElementArrayFinder, by, driver, ExpectedConditions } = require('protractor');

import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


Then(/^Vejo uma mensagem de conflito na matrícula$/, async () => {
    await browser.wait(ExpectedConditions.alertIsPresent(), 1000000); 
    let ale = await browser.switchTo().alert()
    await expect(ale.getText()).to.eventually.equal('Falha na matricula: conflito de horários');
    await ale.accept();
});