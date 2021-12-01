const config = require("../../config");
const fs = require("fs");
const randMillis = require("../utils/randomMillis");
const login = async (page) => {
    await page.waitForSelector('input[name=username]').then(
        async selector => {
            await selector.type(config.login);
        }
    )


    await page.type('input[name=password]', config.password);
    await page.click('button[type=submit]');

    await page.waitForTimeout(5000);
    const cookies = await page.cookies();
    const cookieJson = JSON.stringify(cookies, null, 2);


    const [button] = await page.$x("//button[contains(., 'Не сейчас')]");
    if (button) {
        await button.click();
    }

    try {
        fs.writeFileSync('cookies.json', cookieJson);
    } catch (e) {
        console.log(e);
    }
    await page.waitForTimeout(5000);

}

module.exports = login;