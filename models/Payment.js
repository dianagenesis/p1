const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cardNumber: String,
    cardType: String,
    expiry: String,
    cvv: String,
    bankName: String
}, { timestamps: true });

module.exports = mongoose.model('PaymentModel', paymentSchema);
