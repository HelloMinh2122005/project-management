'use strict'

class UserController {
    constructor(userService) {
        this.UserService = userService;
    }

    async createUser(req, res) {
        try {
            const user = await this.UserService.createUser(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.UserService.getAllUsers();
            res.status(200).send(users);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getUserById(req, res) {
        try {
            const user = await this.UserService.getUserById(req.body.id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await this.UserService.updateUser(req.body.id, req.body);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await this.UserService.deleteUser(req.body.id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

module.exports = UserController;