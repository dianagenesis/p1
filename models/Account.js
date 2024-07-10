const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    accountNumber: String,
    bankName: String,
    ifsc: String,
    accountType: String
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
