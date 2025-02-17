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
            const user = await this.UserService.getUserById(req.params.id);
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
            const user = await this.UserService.updateUser(req.params.id, req.body);
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
            const user = await this.UserService.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(204).send('User deleted successfully');
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async checkUserExists(req, res, sendResponse = true) {
        try {
            const user = await this.UserService.checkUserExists(req.body.email, req.body.username);
            if (user) {
                if (sendResponse) {
                    res.status(409).send('User already exists');
                }
                return true;
            }
            return false;
        } catch (error) {
            if (sendResponse) {
                res.status(400).send(error.message);
            }
            throw new Error(error.message);
        }
    }
}

export default UserController;