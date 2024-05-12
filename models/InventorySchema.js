const mongoose = require('mongoose');

const InventoryDetails = mongoose.Schema({
    machineId:{
        type:Number,
        require:true,
        unique:true
    },
    PadQty:{
        type:Number,
        require:true
    },
    machineLocation:{
        type:String,
        require:true,
        default:"BBDITM LUCKNOW"
    },
    machineStatus:{
        type:String,
        enum:['Active','Inactive'],
        default:"Active"
    }
});

module.exports = mongoose.model('Inventory',InventoryDetails);