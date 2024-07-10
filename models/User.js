const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: String,
    pincode: String,
    mobileNumber: String
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
