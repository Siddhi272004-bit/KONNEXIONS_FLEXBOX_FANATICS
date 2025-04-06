const mongoose=require('mongoose');

// define  schema

const schema=mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    vendorID:String

});

module.exports=mongoose.model("vendor",vendorSchema)