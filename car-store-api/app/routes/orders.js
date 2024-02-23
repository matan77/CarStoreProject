const express = require('express');
const ordersController = require('../controllers/orders');
const authenticateJWT = require("../middleware/authenticateJWT")
const isDeleted = require("../middleware/isDeleted");
const router = express.Router();

router.get('/myOrders', authenticateJWT, ordersController.getOrdersByUser);
router.post('/buy/:id', [authenticateJWT, isDeleted, ordersController.createOrder]);
router.get('/:id', ordersController.getOrder);

module.exports = router;