import { browser, Config } from 'protractor';

export let config: Config = {

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    SELENIUM_PROMISE_MANAGER: false,

    capabilities: {
        browserName: 'chrome'
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../../features/*.feature'
    ],

    onPrepare: () => {
        require('ts-node').register({ project: './tsconfig.json' });
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();

    },
    cucumberOpts: {
        format: [],
        require: ['../../stepdefinitions/*.ts'],
    }
};