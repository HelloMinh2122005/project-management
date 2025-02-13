'use strict'

class AccessController {
    constructor(accessService) {
        this.AccessService = accessService;
    }

    async login(req, res) {
        try {
            const token = await this.AccessService.login(req.body.email, req.body.password);
            res.status(200).json({ token: token });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async signup(req, res) {
        try {
            const token = await this.AccessService.signup(req.body);
            res.status(200).json({ token: token });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default AccessController;