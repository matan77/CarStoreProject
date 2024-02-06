const express = require('express');
const ordersController = require('../controllers/orders');
const authenticateJWT = require("../middleware/authenticateJWT")
const isDeleted = require("../middleware/isDeleted");
const router = express.Router();

router.post('/buy', [authenticateJWT, isDeleted, ordersController.createOrder]);
router.get('/:id', ordersController.getOrder);

module.exports = router;