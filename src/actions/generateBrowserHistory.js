const config = require("../../config");
const shuffle = require("../utils/arrayShuffle");
const randNum = require("../utils/randomNum");
const randMillis = require("./src/utils/randomMillis");


const generateBrowserHistory = async (page) => {
    console.log('будем творить историю')
    let portals = shuffle(config.portals);
    let iteration = config.portalsPerStart +(randNum(3));
    for (let i = 0; i<iteration; i++){
        try{
            await page.goto(portals[i], {waitUntil: 'load', timeout: 0});
            for (let j = 0; j < randNum(5); j++){
                await page.waitForTimeout(randMillis(1000 * 30));
                let links = await page.$$eval('a', as => as.map(a => a.href));
                links = shuffle(links);
                await page.goto(links[0]);
            }
        }  catch (e){
            console.log('Не получается история');
        }
    }
}

module.exports = generateBrowserHistory;