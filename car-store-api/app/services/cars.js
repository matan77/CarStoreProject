const Car = require('../models/car');

module.exports = {
    createCar: async (carData) => {
        try {
            const newCar = new Car(carData);
            const savedCar = await newCar.save();
            return savedCar;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },

    // to do get cars based on filters, add pagination
    getCars: async (filters) => {
        try {
            const cars = await Car.find(filters);
            return cars;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },

    getCarById: async (carId) => {
        try {
            const car = await Car.findById(carId).populate('seller', 'firstName lastName'); //check seller
            return car;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },


    updateCar: async (carId, sellerId, updatedCarData) => {
        try {
            const updatedCar = await Car.findOneAndUpdate(
                { _id: carId, seller: sellerId },
                updatedCarData,
                { new: true }
            );

            if (!updatedCar) {
                throw new Error('You are not the seller of this car');
            }
            return updatedCar;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },


    deleteCar: async (carId) => {
        try {
            const deletedCar = await Car.findOneAndDelete({ _id: carId, seller: sellerId });
            if (!deletedCar) {
                throw new Error('You are not the seller of this car');
            }
            return deletedCar;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },
};
