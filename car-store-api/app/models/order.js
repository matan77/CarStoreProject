const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    saleDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
