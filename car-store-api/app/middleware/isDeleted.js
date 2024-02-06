const { isUserDeleted } = require("../services/users")
const isDeleted = (req, res, next) => {
    try {

        if (isUserDeleted(req.user.id)) {
            return res.status(403).json({ message: 'Forbidden, this account has been deleted' });
        }
    }
    catch {
        return res.status(500).json({ message: error.message });
    }
    next();
};

module.exports = isDeleted;