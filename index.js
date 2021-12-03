const puppeteer = require('puppeteer');
const fs = require('fs');
const login = require('./src/actions/login');
const config = require("./config");
const likes = require("./src/actions/likes");
const generateBrowserHistory = require("./src/actions/generateBrowserHistory");
const randMillis = require("./src/utils/randomMillis");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50
    });
    let page = await browser.newPage();
    let preservedCookies = undefined;
    try {
        preservedCookies = await fs.readFileSync('./cookies.json');
        preservedCookies = await JSON.parse(preservedCookies);
    } catch (e) {
        preservedCookies = undefined;
    }

    if (config.enablePortals) {
        await generateBrowserHistory(page);
    }

    if (!!preservedCookies) {
        await page.setCookie(...preservedCookies);
        await page.goto("https://www.instagram.com/", {waitUntil: 'load', timeout: 0});
    } else {
        await page.goto("https://www.instagram.com/", {waitUntil: 'load', timeout: 0});
        await login(page);
    }

    await page.waitForSelector('[role=dialog] button:nth-child(2)').then(
        async selector => {
            await selector.click();
        }
    );

    try {
        while (true) {
            if (config.enableLikes) {
                await likes(page);
                console.log('Через примерно день начнётся новая задача');
            }
            await page.waitForTimeout((1000 * 60 * 60 * 24) - randMillis(1000 * 60 * 60 * 4));
        }
    } catch (e) {
        console.log(e);
    }


})();