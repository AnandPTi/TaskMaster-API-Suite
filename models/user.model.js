const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true, 
    },
    password:{
        type:String,
        required:true,
    },
    phone_number: {
        type: Number
    },
    role:{
        type:String,
        enum:["Admin", "User"]
    },
    
});

module.exports = mongoose.model("user", userSchema);