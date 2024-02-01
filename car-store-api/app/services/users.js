const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()

module.exports = {
    registerUser: async (firstName, lastName, email, password, role) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await User.create({ firstName, lastName, email, password: hashedPassword, role });
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    loginUser: async (email, password) => {
        try {
            const user = await User.findOne({ email });

            if (user.isDeleted) {
                throw new Error('The account deleted');
            }

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign({ user: { id: user._id, role: user.role } }, process.env.SECRET_KEY, { expiresIn: '7d' });
            return { token };
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },

    getUser: async (id) => {
        try {
            const user = await User.findOne({ _id: id });
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        }
        catch (error) {
            throw new Error('Internal Server Error');
        }
    },

    updateUser: async (id, firstName, lastName) => {
        try {
            return User.updateOne({ _id: id }, { $set: { firstName: firstName, lastName: lastName } });
        }
        catch (error) {
            throw new Error('Internal Server Error');
        }
    },

    deleteUser: async (id) => {
        try {
            return User.updateOne({ _id: id }, { $set: { isDeleted: true } });
        }
        catch (error) {
            throw new Error('Internal Server Error');
        }
    }
}