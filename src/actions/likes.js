const config = require("../../config");
const shuffle = require("../utils/arrayShuffle");
const randMillis = require("../utils/randomMillis");
const randNum = require("../utils/randomNum");
/*const comment = require("./comments");*/


const likes = async (page) => {
    let hashArr = shuffle(config.hashtags);
    const numOfTags = hashArr.length - randNum(0, 3);
    for (let j = 0; j < numOfTags; j++) {
        try {
            await page.goto(`https://www.instagram.com/explore/tags/${hashArr[j]}`, {waitUntil: 'load', timeout: 0});

            try {
                await page.waitForSelector('header button').then(
                    async selector => {
                        await page.click('article:nth-child(2) > div:nth-child(3) a:nth-child(1)');
                        let likesPerTag = config.maxLikesPerHashTag + randNum(0, 10);
                        for (let i = likesPerTag; i > 0; i--) {
                            await page.waitForSelector('article[role=presentation]').then(
                                async selector => {
                                    await page.waitForTimeout(randMillis(10000));
                                    let likeText = await page.$eval('article[role=presentation] section button:nth-child(1) svg', el => el.getAttribute('aria-label'));
                                    if (likeText === 'Нравится') {
                                        console.log('Можно лайкнуть')
                                        if (Math.random() < 0.7) {
                                            console.log('Лайкну пожалуй')
                                            await page.click('article[role=presentation] section button:nth-child(1)');
                                            /* if (config.enableComments && Math.random() < 0.2) {
                                                 comment(page);
                                             }*/
                                            if (Math.random() < 0.2) {
                                                i--;
                                            }
                                        }
                                    }
                                    /* await page.click('div[role=dialog] button:last-child');*/
                                    page.keyboard.press('ArrowRight');
                                    console.log(i);
                                    console.log('----------------');
                                }
                            );
                        }
                    });
            } catch (e) {
                console.log(`Какая-то проблема с тегом ${hashArr[j]}`);
            }
            console.log(`Закончил с хэштегом ${hashArr[j]}`);
            await page.waitForTimeout(randMillis(1000 * 60 * 20));
        } catch (e) {
            console.log('Что-то пошло не так')
            console.log(e);
        }
    }
    console.log('Задача правда выполнена');
}

module.exports = likes;