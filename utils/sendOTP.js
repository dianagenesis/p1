
const axios = require('axios'); 

const sendOTP = async (mobileNumber, message) => {
    try {
        const apiKey = 'api_key'; 
        const apiUrl = 'https://api.sms'; //

        const otpData = {
            apiKey,
            to: mobileNumber,
            message,
        };

        const response = await axios.post(apiUrl, otpData);

        if (response.status === 200) {
            console.log(`SMS sent successfully to ${mobileNumber}`);
        } else {
            console.error(`Failed to send SMS to ${mobileNumber}`);
            throw new Error('Failed to send SMS');
        }
    } catch (error) {
        console.error('Failed to send OTP:', error.message);
        throw error;
    }
};

module.exports = sendOTP;
