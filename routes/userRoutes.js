const express = require('express');
const userRouter = express.Router();
const userCltr = require('../controllers/userCltr');
userRouter.post('/register', userCltr.register);
userRouter.post('/login', userCltr.login);
userRouter.put('/profile',  userCltr.updateAccount);

module.exports = userRouter;
