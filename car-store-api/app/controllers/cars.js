const carsService = require('../services/cars');
const { body, param, validationResult } = require('express-validator');

const validationMiddlewares = [body('company').notEmpty().withMessage('Company is required'),
body('model').notEmpty().withMessage('Model is required'),
body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Invalid year'),
body('price').isNumeric().withMessage('Invalid price'),
body('mileage').isNumeric().withMessage('Invalid mileage'),
body('transmissionType').isIn(['Automatic', 'Manual']).withMessage('Invalid transmission type'),
body('fuelType').optional().isIn(['Gasoline', 'Diesel', 'Electric']).withMessage('Invalid fuel type')];

module.exports = {
    getCars: async (req, res) => {
        try {

            const page = parseInt(req.query.page) - 1 || 0;
            const search = req.query.search;

            return res.status(200).json(await carsService.getCars(page, search));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getCar: [
        param('id').isMongoId(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const carId = req.params.id;
            const car = await carsService.getCarById(carId)
            return res.status(200).json(car);
        }
    ],

    getCarsByUser: async (req, res) => {
        try {
            if (req.user.role !== 'Seller') {
                return res.status(403).json({ message: "Only seller allowed" });
            }

            const page = parseInt(req.query.page) - 1 || 0;

            return res.status(200).json(await carsService.getCarsByUser(req.user.id, page));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createCar: [
        ...validationMiddlewares,
        async (req, res) => {

            if (req.user.role !== 'Seller') {
                return res.status(403).json({ message: "Only seller can add cars" });
            }
            const errors = validationResult(req);


            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            try {
                await carsService.createCar({
                    ...req.body, seller: req.user.id
                })

                res.status(201).json();
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    ],

    updateCar: [
        ...validationMiddlewares,
        param('id').isMongoId(),
        async (req, res) => {
            const errors = validationResult(req);

            if (req.user.role !== 'Seller') {
                return res.status(403).json({ message: "Only seller allowed" });
            }

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const carId = req.params.id;
            try {
                await carsService.updateCar(carId, req.user.id, req.body)
                res.status(202).json();
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    ],
    deleteCar: [
        param('id').isMongoId(),
        async (req, res) => {
            try {
                const carId = req.params.id;
                return res.json(carsService.deleteCar(carId));
            }
            catch (error) {
                throw new Error('Internal Server Error');
            }
        }
    ]
}
