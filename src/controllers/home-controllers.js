const { signUp, signIn } = require('../services/user.service');

const getHomePage = async (req, res) => {
    return res.render('home-page.ejs');
}

const getSignUpPage = async (req, res) => {
    return res.render('signup-page.ejs', { errorMessage: req.flash('error') });
}

const getSignInPage = async (req, res) => {
    return res.render('signin-page.ejs', { errorMessage: req.flash('error') });
}

const getWelcomePage = async (req, res) => {
    return res.render('welcome-page.ejs');
}

const addNewUser = async (req, res) => {
    try {
        const result = await signUp(req);
        if (result.status === 201) {
            req.flash('success', result.message || 'Welcome to my stupid website');
            return res.redirect('/signin');
        } else {
            req.flash('error', result.message || 'User name or Email already exists');
            return res.redirect('/signup');
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'Damn bro, you cooked somewhere');
        return res.redirect('/signup');
    }
};

const signInUser = async (req, res) => {
    try {
        const result = await signIn(req);
        if (result.status === 200) {
            req.session.user = req.body;
            req.flash('success', result.message);
            return res.redirect('/welcome');
        } else {
            req.flash('error', result.message);
            return res.redirect('/signin');
        }

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getHomePage,
    getSignUpPage,
    addNewUser,
    getSignInPage,
    signInUser,
    getWelcomePage
}