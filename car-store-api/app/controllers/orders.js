const ordersService = require('../services/orders');
const { body, param, validationResult } = require('express-validator');


module.exports = {
    getOrder: [
        param('id').isMongoId(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const orderId = req.params.id;
            const order = await ordersService.getOrderById(orderId)
            return res.status(200).json(order);
        }
    ],

    createOrder: [
        param('id').isMongoId(),
        async (req, res) => {

            if (req.user.role !== 'buyer') {
                return res.status(403).json({ message: "Only buyer can order" });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const carId = req.params.id;
            try {
                const order = await ordersService.createOrder(carId, req.user.id);
                res.status(201).json(order);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    ]
    ,

}
