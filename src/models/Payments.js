const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    netPrice: { type: Number, required: true },
    fee: { type: Number, required: true },
    feePercentage: { type: Number, required: true },
    installments: { type: Number, required: true },
    currency: { type: Number, required: true },
    paymentMethod: { type: String, required: true }

});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;