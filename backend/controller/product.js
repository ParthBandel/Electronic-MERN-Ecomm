const ApiFeatures = require('../utils/apifeatures');
const Product = require("../models/productModel");
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const cloudinary = require('cloudinary');
const asynchandler = require('express-async-handler');

//create product 
exports.createProduct = async (req,res,next) =>{
    const mycloud = await cloudinary.v2.uploader.upload(req.body.images, {
        folder: "products",
    }); 
    const imagesLink = []; 
    console.log(mycloud);
    imagesLink.push({ 
        public_id: mycloud.public_id,
        url: mycloud.url
    });

    req.body.images = imagesLink;
    console.log(imagesLink);
    req.body.user = req.user.id;
    console.log(req.user.id);
    const product = await Product.create(req.body);
    console.log(product);
        res.status(201).json({
            success:"true",
            product,
        });
};

//show all products
exports.getallProducts = async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeature.query; 
    let filteredProductsCount = products.length; 
    apiFeature.pagination(resultPerPage); 
    products = await apiFeature.query; 

    
    res.status(201).json({
        success:"true",
        products,
        productCount,
        filteredProductsCount, 
        resultPerPage
    });
}

// relatable products 
exports.getRelatableProducts = async(req,res,next) => { 
    const productCount = await Product.countDocuments(); 

    const products = await Product.aggregate([{'$sample' : {'size' : 3}}]);

    if(!products){
        return next(new ErrorHandler("Products coming along", 400));
    }

    res.status(200).json({
        success: true, 
        products,
        productCount,
        message: "Product displayed"
    });
}; 

//update product 
exports.updateProduct = async (res,req,next) => {
    const foundProduct = await Product.findById(req.params.id); 

    if(!foundProduct){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        }); 
    }

    foundProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true, 
        useFindAndModify: true
    });

    res.status(200).json({
        success: true, 
        foundProduct
    });

};

//get product details
exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  }; 


//delete product 
exports.deleteProduct = async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
       return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted"
    });
}; 


//get all products (admin)
exports.getAdminProducts = asynchandler(async(req,res,next) => {
    const products = await Product.find(); 

    res.status(200).json({
        success: true, 
        products,
    });
});


// create new review or update review 
exports.createProductReview = asynchandler(async(req,res,next) => {

    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id, 
        name: req.user.name, 
        rating:Number(rating), 
        comment,
    };
    if(productId.match(/^[0-9a-fA-F]{24}$/)){
        console.log("valid id");
    }
    const product = await Product.findById(productId); 

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
        ); 
    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()){
                (rev.rating = rating),(rev.comment = comment) 
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numofReviews = product.reviews.length
    }
    let avg = 0;
    product.ratings = product.reviews.forEach( rev=>{
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true 
    });
});

// get all reviews of product 
exports.getProductReviews = asynchandler(async(req,res,next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true, 
        reviews: product.reviews,
    });
});

//delete a review 
exports.deleteReview = asynchandler(async(req,res,next) => {
    const product = await Product.findById(req.query.productId); 

    if(!product){
        return next(new ErrorHandler("Product not found", 404)); 
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id);
    let avg = 0; 
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length; 

    const numofReviews = reviews.length; 
    await product.findByIdAndUpdate(req.query.productId, {
        reviews, 
        ratings,
        numofReviews
    }, {
        new: true, 
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true
    });
})
