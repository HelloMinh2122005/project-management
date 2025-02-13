'use strict';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.model.js';

class AccessService {
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid login credentials');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid login credentials');
        }

        // create token key 
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return token;
    }

    async signup(user) {
        const existingUser = await User.findOne({
            $or: [
                { email: user.email },
                { username: user.username }
            ]
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await User.create(
            { ...user, password: hashedPassword }
        );

        if (!newUser) {
            throw new Error('Error creating user');
        }

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return token;
    }

}

export default AccessService;