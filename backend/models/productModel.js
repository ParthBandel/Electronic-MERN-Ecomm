const mongoose = require("mongoose"); 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
    {
        public_id:{
            type: String, 
            required: true 
        },
        url:{
            type: String,
            required: true
        }
    }, 
],
    category : { 
        type: String,
        required: true
    }, 
    countInStock:{
        type: Number,
        required: true 
    },
    numofReviews:{
        type: Number,
        default:0 
    },
    reviews: [
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }, 
        name:{
            type: String,
            required: true 
        },
        rating:{
            type:Number,
            required: true 
        },
        comment:{
            type: String, 
            required: true
        }
    } 
],
    user: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: "User",
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now 
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;