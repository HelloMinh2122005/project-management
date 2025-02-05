const authUser = (req) => {
    if (req.session && req.session.user) {
        return true;
    }
    return false;
}

module.exports = {
    authUser
}