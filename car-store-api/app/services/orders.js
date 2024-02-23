const mongoose = require('mongoose');
const Order = require('../models/order');
const { checkAndUpdateIsOrdered } = require('../services/cars')

module.exports = {
    createOrder: async (car, buyer) => {
        try {
            if (await checkAndUpdateIsOrdered(car)) {
                return;
            }

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
    getOrdersByUser: async (userId, role, page) => {
        try {
            let orders;
            let totalOrdersCount;

            if (role === 'Buyer') {
                orders = await Order.find({ buyer: userId })
                    .skip(page * 10)
                    .limit(10)
                    .populate({
                        path: 'car',
                        select: 'company model year price seller',
                        populate: {
                            path: 'seller',
                            select: 'firstName lastName email -_id'
                        }
                    })
                    .populate('buyer', 'firstName lastName');
                totalOrdersCount = await Order.countDocuments({ buyer: userId });
            }

            if (role === 'Seller') {
                orders = await Order.aggregate([
                    { $lookup: { from: 'cars', localField: 'car', foreignField: '_id', as: 'car' } },
                    { $unwind: '$car' },
                    { $match: { 'car.seller': new mongoose.Types.ObjectId(userId) } },
                    { $skip: page * 10 },
                    { $limit: 10 },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'buyer',
                            foreignField: '_id',
                            as: 'buyer'
                        }
                    },
                    { $unwind: '$buyer' },
                    {
                        $project: {
                            _id: 1,
                            saleDate: 1,
                            car: { company: 1, model: 1, year: 1, price: 1 },
                            buyer: { firstName: 1, lastName: 1, email: 1 }
                        }
                    }
                ]);

                // Calculate total orders count with aggregation
                const totalOrdersCountPipeline = [
                    { $lookup: { from: 'cars', localField: 'car', foreignField: '_id', as: 'car' } },
                    { $unwind: '$car' },
                    { $match: { 'car.seller': new mongoose.Types.ObjectId(userId) } },
                    { $count: 'totalOrders' }
                ];

                const [totalOrders] = await Order.aggregate(totalOrdersCountPipeline);
                const totalOrdersCount = totalOrders ? totalOrders.totalOrders : 0;

                const totalPages = Math.ceil(totalOrdersCount / 10);
                return { orders, totalPages };
            }
            const totalPages = Math.ceil(totalOrdersCount / 10);
            return { orders, totalPages };
        } catch (error) {
            console.log(error);
            throw new Error('Internal Server Error');
        }
    }



    // stats
    // filter by date
    // user with most

}