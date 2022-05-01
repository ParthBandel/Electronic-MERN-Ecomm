const asyncHandler = require('express-async-handler');
const catchAsyncError = require('../middleware/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = asyncHandler(async (req,res,next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "ElectronicsPart",
        },
    });

    res.status(200).json({
        success: true, 
        client_secret: myPayment.client_secret
    });
});

exports.sendStripeApiKey = asyncHandler(async (req,res,next) => {
    console.log(process.env.STRIPE_API_KEY)
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});