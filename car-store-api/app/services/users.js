const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    registerUser: async (firstName, lastName, email, password, role) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ firstName, lastName, email, password: hashedPassword, role });
            await newUser.save();
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    loginUser: async (email, password) => {
        try {
            const user = await User.findOne({ email });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
            return { token };
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }
}