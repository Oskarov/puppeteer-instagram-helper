const randomNum = (num) => {
    let rand = 1 - 0.5 + Math.random() * (num - 1);
    return Math.round(rand);
}

module.exports = randomNum;