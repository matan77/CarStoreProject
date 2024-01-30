const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    price: Number,
    mileage: { type: Number },
    transmissionType: { type: String, enum: ['Automatic', 'Manual'] },
    fuelType: { type: String, enum: ['Gasoline', 'Diesel', 'Electric'] },
    phone: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Car', carSchema);
