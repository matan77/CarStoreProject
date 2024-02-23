const express = require('express');
const statisticsController = require('../controllers/statistics');
const router = express.Router();

router.get('/BuyerWithMostOrders', statisticsController.getBuyerWithMostOrders);
router.get('/TotalSalesByCompany', statisticsController.getTotalSalesByCompany);
router.get('/AveragePriceOfCarsSold', statisticsController.getAveragePriceOfCarsSold);

module.exports = router;