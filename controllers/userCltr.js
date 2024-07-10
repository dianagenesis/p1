const bcrypt = require('bcryptjs')
const pick = require('lodash/pick')
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const sendOTP = require('../utils/sendOTP')
const userCltr = {}


userCltr.register = async (req, res) => {
    const { username, password, email, mobileNumber } = req.body;

    try {

        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });


        const user = new User({ username, password, email, mobileNumber, otp });


        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;


        await user.save();


        const otpMessage = `Your OTP for registration: ${otp}`;
        await sendOTP(mobileNumber, otpMessage);

        res.status(200).json({ message: 'Registration Successful', userId: user._id });

    } catch (e) {
        console.error('Registration Failed:', e.message);
        res.status(400).json({ message: 'Registration Failed' });
    }
};
userCltr.verifyOTP = async (req, res,next) => {
    const { mobileNumber, otp } = req.body;

    try {
        
        const user = await User.findOne({ mobileNumber, otp });

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        
        user.otp = null;
        await user.save();
        next();
        res.status(200).json({ message: 'OTP verified successfully', userId: user._id });

    } catch (error) {
        console.error('OTP verification failed:', error.message);
        res.status(500).json({ message: 'OTP verification failed' });
    }
}
userCltr.login = async (req, res) => {
    const body = pick(req.body, ["username", "password"])
    try {
        const userDoc = await User.findOne({ username: body.username })
        if (userDoc) {
            const result = await bcrypt.compare(body.password, userDoc.password)

            if (result) {
                const tokenData = {
                    id: userDoc._id,
                    role: userDoc.role
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY)

                res.json({ token: `Bearer ${token}`, message: "Login Successful", id: userDoc._id })


            } else {
                res.status(401).json({ message: "invalid username/password" })
            }
        } else {
            res.status(401).json({ message: "invalid username/password" })
        }
    } catch (err) {
        res.json(err)
    }
}
userCltr.updateAccount = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id
        const userDoc = await User.findByIdAndUpdate(id, body)
        res.status(200).json({ message: 'account updated successfully' })
    } catch (e) {
        res.json(e)
    }
}
userCltr.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.json(e)
    }
}
userCltr.removeUser = async (req, res) => {
    const id = req.params.id
    try {
        const userDoc = await User.findByIdAndDelete(id)
        res.json(userDoc)
    } catch (err) {
        res.json(err)
    }
}
module.exports = userCltr