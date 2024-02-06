const usersService = require('../services/users');
const { body, validationResult } = require('express-validator');

module.exports = {
    registerUser: [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
            .withMessage('Password must include at least one uppercase letter, one lowercase letter, and one digit'),
        body('role').isIn(['Seller', 'Buyer']).withMessage('Role must be Seller or Buyer'),
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { firstName, lastName, email, password, role } = req.body;
            try {
                const result = await usersService.registerUser(firstName, lastName, email, password, role);
                res.status(201).json(result);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    ],
    
    loginUser: [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
            .withMessage('Password must include at least one uppercase letter, one lowercase letter, and one digit'),
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            try {
                const result = await usersService.loginUser(email, password);
                res.json(result);
            } catch (error) {
                res.status(401).json({ message: error.message });
            }
        }
    ],

    getUser: async (req, res) => {
        try {
            const id = req.user.id;

            res.status(200).json(await usersService.getUser(id));

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateUser: [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const id = req.user.id;
            const { firstName, lastName } = req.body;

            try {
                const result = await usersService.updateUser(id, firstName, lastName);
                res.status(202).json(result);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    ],

    deleteUser: async (req, res) => {
        try {
            const id = req.user.id;

            res.status(200).json(await usersService.deleteUser(id));

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
