const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticatedUser = asynchandler(async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new Error("Please login to use this resource"));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(decode.id)
    next();

})

exports.admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401)
        throw new Error("Not authorized as an Admin");
    }
}

