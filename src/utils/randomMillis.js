const randomMillis = (millis) => {
    let rand = 1000 - 0.5 + Math.random() * (millis - 1001);
    return Math.round(rand);
}

module.exports = randomMillis;