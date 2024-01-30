const { registerUser, loginUser } = require('../services/users');


module.exports = {
    registerUser: async (req, res) => {
        const { firstName, lastName, email, password, role } = req.body;
        try {
            const result = await registerUser(firstName, lastName, email, password, role);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await loginUser(email, password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
};

module.exports = { registerUser, loginUser };
