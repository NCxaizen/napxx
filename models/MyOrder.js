const mongoose = require('mongoose')
const { Schema } = mongoose;

// Schema Define 
const Orders = new Schema({
    email: {
        type: String,
        required : true,
        unique: true
    },
    order_data: {
        type: Array,
        required : true
    }

})

const MyOrders = mongoose.model('MyOrder', Orders);
module.exports = MyOrders;