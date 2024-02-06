const express = require('express');
const carsController = require('../controllers/cars');
const authenticateJWT = require("../middleware/authenticateJWT")
const isDeleted = require("../middleware/isDeleted")
const router = express.Router();

router.post('/', [authenticateJWT, isDeleted, ...carsController.createCar]);
router.get('/:id', carsController.getCar);
router.patch('/:id', [authenticateJWT, isDeleted, ...carsController.updateCar]);
router.delete('/:id', [authenticateJWT, isDeleted, ...carsController.deleteCar]);

module.exports = router;