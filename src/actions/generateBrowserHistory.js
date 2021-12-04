const config = require("../../config");
const shuffle = require("../utils/arrayShuffle");
const randNum = require("../utils/randomNum");
const randMillis = require("../utils/randomMillis");


const generateBrowserHistory = async (page, portalsCount = config.portalsPerStart) => {
    console.log('будем творить историю')
    let portals = shuffle(config.portals);
    let iteration = portalsCount + (randNum(1, 3));
    for (let i = 0; i < iteration; i++) {
        try {
            await page.goto(portals[i]);
            console.log(`Выбран портал: ${portals[i]}`);
            await page.waitForTimeout(2000);
            let rand = randNum(1, 5);
            console.log(rand);
            for (let j = 0; j < rand; j++) {
                let links = await page.$$eval('a', as => as.map(a => a.href));
                links = shuffle(links);
                if (links[0].indexOf('instagram') === -1) {
                    await page.goto(links[0]);
                    console.log(`В итерации ${i + 1} и внутри ${j + 1} иду на ${links[0]}`);
                }
                await page.waitForTimeout(randMillis(1000 * 5));
            }
        } catch (e) {
            console.log('Не получается история');
        }
    }
    console.log('С историей покончено');
}

module.exports = generateBrowserHistory;