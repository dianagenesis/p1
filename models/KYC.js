const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kycSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    identityType: String,
    identityNumber: String,
    documentImageUrl: String,
    status: { type: String,enum:['pending','approved','rejected'] ,default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('KYC', kycSchema);
