const config = {
    login: "", //логин - login
    password: "", //пароль - password

    width: 300, //window's width - ширина браузера
    height: 300, //window's heights - высота браузера

    enableLikes: true, // разрешить основной функционал - basic functionality
    likesChance: 0.7, //процент поставленных лайков от 0.1 до 0.9 - chance of like per card from 0.1 to 0.9
    enableComments: true, // разрешить оставлять комментарии - leave comments
    enablePortals: true, // разрешить генерацию браузерной истории - generation of browser history
    portalsPerStart: 5, // сколько сайтов посетить перед основной работой - count of the sites visited before the basic work
    enableMidPortals: true, // разрешить прерывание основной работы на другие сайты - resolve the transfer of basic work to other sites
    maxMidPortalsPerTag: 3, // максимальное количество сайтов в течении прерывания - maximum number of sites in the current flow
    maxLikesPerHashTag: 40, // количество лайков на тег - count of likes per tag

    hashtags: [], // теги без знака # - tags without #
    comments: [], // набор комментариев - comments
    portals: [] // сторонние сайты для посещения - site urls to visit
}

module.exports = config;