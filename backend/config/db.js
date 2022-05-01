require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongobd connection done");
        console.log(process.env.PORT);
    }
        catch (error){
            console.log("Connection failed");
            process.exit(1);
        }
};

module.exports = connectDB;