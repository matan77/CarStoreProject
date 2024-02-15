const express = require('express');
const userController = require('../controllers/users');
const authenticateJWT = require("../middleware/authenticateJWT")
const router = express.Router();

router.get('/', authenticateJWT, userController.getUser);
router.get('/logout', authenticateJWT, userController.logoutUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.patch('/', [authenticateJWT, ...userController.updateUser]);
router.delete('/', authenticateJWT, userController.deleteUser);


module.exports = router;
