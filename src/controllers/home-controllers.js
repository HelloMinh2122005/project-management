const connection = require('../configs/database')

const getHomePage = async (req, res) => {
    return res.render('home-page.ejs');
}

module.exports = {
    getHomePage
}