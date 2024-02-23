const express = require('express');
const carsController = require('../controllers/cars');
const authenticateJWT = require("../middleware/authenticateJWT")
const isDeleted = require("../middleware/isDeleted")
const router = express.Router();

router.get('/', carsController.getCars);
router.post('/', [authenticateJWT, isDeleted, ...carsController.createCar]);
router.get('/myCars', authenticateJWT, carsController.getCarsByUser);
router.get('/:id', carsController.getCar);
router.patch('/:id', [authenticateJWT, isDeleted, ...carsController.updateCar]);
router.delete('/:id', [authenticateJWT, isDeleted, ...carsController.deleteCar]);

module.exports = router;