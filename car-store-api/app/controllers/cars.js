const carsService = require('../services/cars');
const { body, validationResult } = require('express-validator');

module.exports = {
    getCar: undefined,
    createCar: [
        body('company').notEmpty().withMessage('Company is required'),
        body('model').notEmpty().withMessage('Model is required'),
        body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Invalid year'),
        body('price').isNumeric().withMessage('Invalid price'),
        body('mileage').isNumeric().withMessage('Invalid mileage'),
        body('transmissionType').isIn(['Automatic', 'Manual']).withMessage('Invalid transmission type'),
        body('fuelType').optional().isIn(['Gasoline', 'Diesel', 'Electric']).withMessage('Invalid fuel type'),
        body('phone').notEmpty().withMessage('Phone is required'),
        async (req, res) => {

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { company, model, year, price, mileage, transmissionType, fuelType, phone } = req.body;


            try {
                res.status(201);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    ],
    updateCar: undefined,
    deleteCar: undefined
}
