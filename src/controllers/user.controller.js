'use strict'

class UserController {
    constructor(userService) {
        this.UserService = userService;
    }
}

module.exports = UserController;