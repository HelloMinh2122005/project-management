const { signUp, signIn } = require('../services/user.service');

const getHomePage = async (req, res) => {
    return res.render('home-page.ejs');
}

const getSignUpPage = async (req, res) => {
    return res.render('signup-page.ejs');
}

const getSignInPage = async (req, res) => {
    return res.render('signin-page.ejs');
}

const getWelcomePage = async (req, res) => {
    return res.render('welcome-page.ejs');
}

const addNewUser = async (req, res) => {
    try {
        const result = await signUp(req);
        if (result.status === 201) {
            return res.render('signin-page.ejs', { user: req.body });
        } else {
            return res.render('signup-page.ejs', { errorMessage: result.message });
        }
    } catch (error) {
        console.error(error);
        return res.render('signup-page.ejs', { errorMessage: 'An unexpected error occurred.' });
    }
};

const signInUser = async (req, res) => {
    try {
        const result = await signIn(req);
        if (result.status === 200) {
            req.session.user = req.body;
            return res.render('welcome-page.ejs', { errorMessage: result.message });
        } else {
            return res.render('signin-page.ejs', { errorMessage: result.message });
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