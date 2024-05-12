const mongoose = require('mongoose')
const {Schema} = mongoose;

// Schema Define 
const userschema = new mongoose.Schema({
    name : {
        type : String,
        default:true
    },
    email:{
        type:String,
        default:true
    },

    location :{
        type: String,
        default:true
    },
    password :{
        type: String,
        default:true
    },
    date : {
        type:Date,
        default: Date.now
    }
})
// Create Model
const User = mongoose.model('user',userschema)

module.exports = User; // Export the User model for use in other files
