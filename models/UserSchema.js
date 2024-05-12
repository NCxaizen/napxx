const mongoose = require('mongoose');

const  UserDetails = mongoose.Schema({
    UserId:{
        type:Number,
        require:[true, "Please add UserID"],
        unique:true
    },
    UserName:{
        type:String,
        require:[true,"Please add UserName"],

    },
    PadUsed:{
        type:Number,
        require:[true,"Please add pad details"]
    }

});

module.exports = mongoose.model('UserDetails',UserDetails);