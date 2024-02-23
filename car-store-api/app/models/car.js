const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    company: String,
    model: String,
    year: Number,
    price: Number,
    mileage: { type: Number },
    transmissionType: { type: String, enum: ['Automatic', 'Manual'] },
    fuelType: { type: String, enum: ['Gasoline', 'Diesel', 'Electric'] },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isOrdered: { type: Boolean, default: false }
});

module.exports = mongoose.model('Car', carSchema);
