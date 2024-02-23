const statisticsService = require('../services/statistics');

module.exports = {
    getBuyerWithMostOrders: async (req, res) => {
        try {
            const buyerWithMostOrders = await statisticsService.getBuyerWithMostOrders()
            return res.status(200).json(buyerWithMostOrders);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getTotalSalesByCompany: async (req, res) => {
        try {
            const totalSalesByCompany = await statisticsService.getTotalSalesByCompany()
            return res.status(200).json(totalSalesByCompany);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAveragePriceOfCarsSold: async (req, res) => {
        try {
            const averagePriceOfCarsSold = await statisticsService.getAveragePriceOfCarsSold()
            return res.status(200).json(averagePriceOfCarsSold);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}