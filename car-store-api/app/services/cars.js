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
    getCars: async (page, search) => {
        try {
            let filters = { isOrdered: false };
            if (search && search !== "") {
                filters.$or = [
                    { company: { $regex: search, $options: 'i' } },
                    { model: { $regex: search, $options: 'i' } }
                ];
            }

            const totalPages = Math.ceil(await Car.countDocuments(filters) / 10);

            const cars = await Car.find(filters)
                .skip(page * 10)
                .limit(10)
                .populate('seller', 'email firstName lastName -_id');
            return { cars, totalPages };
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },

    getCarById: async (carId) => {
        try {
            const car = await Car.findById(carId).populate('seller', 'email firstName lastName -_id');
            return car;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    },

    getCarsByUser: async (userId, page) => {
        try {
            const cars = await Car.find({ seller: userId }).populate('seller', 'email firstName lastName -_id').skip(page * 10).limit(10);
            const totalPages = Math.ceil(await Car.countDocuments({ seller: userId }) / 10);
            return { cars, totalPages };

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
            console.log(error);
            throw new Error('Internal Server Error');
        }
    },
    checkAndUpdateIsOrdered: async (carId) => {
        try {
            const car = await Car.findById(carId);
            if (!car) {
                throw new Error('Car not found');
            }
            const isOrdered = car.isOrdered;

            if (!car.isOrdered) {
                car.isOrdered = true;
                await car.save();
            }
            return isOrdered;
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
