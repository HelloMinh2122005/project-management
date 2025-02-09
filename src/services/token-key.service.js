const token = require('../models/token-key.models')

const addToken = async (req, res) => {
    try {
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const newToken = await token.create({ ...req.body, expiresAt });
        return res.status(201).json({ message: 'Token created', newToken });
    } catch (error) {
        throw new Error(error);
    }
}

const deleteToken = async (req, res) => {
    try {
        const deletedToken = await token.findByIdAndDelete(req.params.id);
        if (!deletedToken) {
            return res.status(404).json({ message: 'Token not found' });
        }
        return res.status(200).json({ message: 'Token deleted', deletedToken });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addToken,
    deleteToken
}