const Order = require('../models/order');

module.exports = {
    createOrder: async (car, buyer) => {
        try {
            const newOrder = new Order({
                car,
                buyer
            });
            const savedOrder = await newOrder.save();
            return savedOrder;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },
    getOrderById: async (orderId) => {
        try {
            const order = await Order.findById(orderId)
                .populate({
                    path: 'car',
                    select: 'company model year price',
                    populate: {
                        path: 'seller',
                        select: 'firstName lastName'
                    }
                })
                .populate('buyer', 'firstName lastName');

            return order;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },










    // stats
    // filter by date
    // user with most

}