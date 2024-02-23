const Order = require('../models/order');

module.exports = {
    getBuyerWithMostOrders: async () => {
        try {
            const buyerWithMostOrders = await Order.aggregate([
                { $group: { _id: '$buyer', totalOrders: { $sum: 1 } } },
                { $sort: { totalOrders: -1 } },
                { $limit: 1 },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'buyer'
                    }
                },
                { $unwind: '$buyer' },
                { $project: { _id: 0, buyer: { firstName: 1, lastName: 1 }, totalOrders: 1 } }
            ]);
            return buyerWithMostOrders;
        } catch (error) {
            console.log(error);
            throw new Error('Internal Server Error');
        }
    },
    getTotalSalesByCompany: async () => {
        try {
            const totalSalesByCompany = await Order.aggregate([
                { $lookup: { from: 'cars', localField: 'car', foreignField: '_id', as: 'car' } },
                { $unwind: '$car' },
                {
                    $group: {
                        _id: '$car.company',
                        totalSales: { $sum: 1 },
                        totalRevenue: { $sum: '$car.price' }
                    }
                },
                { $project: { _id: 0, company: '$_id', totalSales: 1, totalRevenue: 1 } }
            ]);
            return totalSalesByCompany;
        } catch (error) {
            console.log(error);
            throw new Error('Internal Server Error');
        }
    },
    getAveragePriceOfCarsSold: async () => {
        try {
            const averagePriceOfCarsSold = await Order.aggregate([
                { $lookup: { from: 'cars', localField: 'car', foreignField: '_id', as: 'car' } },
                { $unwind: '$car' },
                {
                    $group: {
                        _id: null,
                        averagePrice: { $avg: '$car.price' }
                    }
                },
                { $project: { _id: 0, averagePrice: 1 } }
            ]);

            return averagePriceOfCarsSold;
        } catch (error) {
            console.log(error);
            throw new Error('Internal Server Error');
        }
    }
}