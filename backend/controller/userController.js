const ApiFeatures = require('../utils/apifeatures');
const ErrorHandler = require('../utils/errorhandler');
const User = require('../models/userModel');
const asynchandler = require('express-async-handler');
const sendToken = require('../utils/jwtTokens');


//register a user 
exports.registerUser = async(req, res, next) => {
    
    const {name, email, password} = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,email,password
    });
    sendToken(user, 201, res);
}

//login user
exports.loginUser = async (req, res, next) => {

    const {email, password} = req.body;

    if(!email || !password){
        return next(new Error("Enter the email and password"));
    }
    
    const user = await User.findOne({ email }).select("+password");
    
    if(!user){
        return next(new Error("Invalid email or password"));
    }

    const isPasswordMatched = await user.matchPassword(password);

  if (!isPasswordMatched) {
    return next(new Error("Invalid email or password"));
  }
    sendToken(user,200,res);

}

//logout 
exports.logoutUser = asynchandler(async (req,res,next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true, 
        message: "Logged Out"
    });
})

//get user details 
exports.getUserDetails = asynchandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    res.status(200).json({
      success: true,
      user 
    });
  });
  
  // update User password
  exports.updatePassword = asynchandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new Error("Old password is incorrect"));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new Error("password does not match"));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
    const token = user.getJWTtoken();
    res.status(200).json({
        user,
        token
    })
  });

// get all users (admin)
exports.getAllUser = asynchandler(async (req, res, next) => {
  const users = await User.find();
  console.log("Users");
  res.status(200).json({
    success: true, 
    users,
  });
}); 

//delete user 
exports.deleteUser = asynchandler(async (req, res, next) => {
  const user = await User.findById(req.params.id); 

  if(!user){
    return next(
      new Error("User doesn't exist")
    );
  }

  await user.remove(); 
  res.status(200).json({
    success: true, 
    message: "User deleted Successfully",
  });
});