const config = require("../../config");
const shuffle = require("../utils/arrayShuffle");
const randMillis = require("../utils/randomMillis");


const comment = async (page) => {
    console.log('будем комментировать')
    let comments = shuffle(config.comments);

}

module.exports = comment();