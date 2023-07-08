let mongoose=require("mongoose");
require("dotenv").config();

let connection=mongoose.connect(process.env.URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

module.exports={connection}