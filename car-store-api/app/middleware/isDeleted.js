const { isUserDeleted } = require("../services/users");

const isDeleted = async (req, res, next) => {
    try {
        const deleted = await isUserDeleted(req.user.id);
        if (deleted) {
            return res.status(403).json({ message: 'Forbidden, this account has been deleted' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    next();
};

module.exports = isDeleted;
