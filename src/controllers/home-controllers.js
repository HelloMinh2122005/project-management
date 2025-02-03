const connection = require('../configs/database');
const { signUp } = require('../services/user.service');

const getHomePage = async (req, res) => {
    return res.render('home-page.ejs');
}

const getSignUpPage = async (req, res) => {
    return res.render('signup-page.ejs');
}

const addNewUser = async (req, res) => {
    return await signUp(req, res);
}

module.exports = {
    getHomePage,
    getSignUpPage,
    addNewUser
}