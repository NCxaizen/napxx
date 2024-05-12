const mongoose = require('mongoose');

const MachineInfo = mongoose.Schema({
    MacAddress:{
        type:String,
        
        required:true
        
    },
    MachineStatus:{
        type:String,
        required:true,
       
        
    },
    PadQty:{
        type:Number,
        require:true
    },
    MachineLocation:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('MachineInfo',MachineInfo);