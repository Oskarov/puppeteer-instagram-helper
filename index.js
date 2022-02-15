const puppeteer = require('puppeteer');
const fs = require('fs');
const login = require('./src/actions/login');
const config = require("./config");
const likes = require("./src/actions/likes");
const generateBrowserHistory = require("./src/actions/generateBrowserHistory");
const randMillis = require("./src/utils/randomMillis");

(async () => {
    let tryToReachInstagramCounts = 0;
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: [
            '--mute-audio',
            `--window-size=${config.width},${config.height}`
        ]
    });
    let page = await browser.newPage();
    let preservedCookies = undefined;
    try {
        preservedCookies = await fs.readFileSync('./cookies.json');
        preservedCookies = await JSON.parse(preservedCookies);
    } catch (e) {
        preservedCookies = undefined;
    }

    if (config.enablePortals && !config.testMode) {
        await generateBrowserHistory(page);
    }


        while (tryToReachInstagramCounts < 3) {
            try {
                if (!!preservedCookies) {
                    await page.setCookie(...preservedCookies);
                    await page.goto("https://www.instagram.com/", {waitUntil: 'load', timeout: 0});
                } else {
                    await page.goto("https://www.instagram.com/", {waitUntil: 'load', timeout: 0});
                    await login(page);
                }
                tryToReachInstagramCounts = 4;
            } catch (e){
                tryToReachInstagramCounts++;
                console.log(e);
            }
        }



    try {
        await page.waitForSelector('[role=dialog] button:nth-child(2)').then(
            async selector => {
                await selector.click();
            }
        );
    } catch (e) {
        console.log(e);
    }

    try {
        while (true) {
            let timeToWait = (1000 * 60 * 60 * config.waitHoursForNewSession) - randMillis(1000 * 60 * 60);
            if (config.enableLikes) {
                await likes(page);
                console.log(`Через ${config.waitHoursForNewSession} начнётся новая задача`);
            }
            tryToReachInstagramCounts = 0;
            await page.waitForTimeout(timeToWait);
        }
    } catch (e) {
        console.log(e);
    }


})();