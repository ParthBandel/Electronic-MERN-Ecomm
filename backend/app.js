const express = require('express'); 
const app = express();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error')
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
dotenv.config();

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: '50mb' , extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(fileUpload()); 


//route import 
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');


app.use("/",product);
app.use("/", user)
app.use("/",order);


//middleware 
app.use(errorMiddleware);

module.exports = app;

