const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Inventory = require('../models/InventorySchema');
const app = express();

// Getting all Inventory Details...

router.route('/').get(asyncHandler(async (req,res)=>{

    const inventory = await Inventory.find();
    res.status(200).json(inventory);


    

}));

// Getting Inventory detail of particular machine

router.route('/:id').get(asyncHandler(async (req,res)=>{

    const machineids = await Inventory.findById(req.params.id);
    if(!machineids){
        res.status(404)
        throw new Error("Machine not found..")
    }
    res.status(200).json(machineids);

}));


// Getting the machines by their status
router.route('/status/:status').get(asyncHandler(async (req,res)=>{

    const machine = await Inventory.find({machineStatus: req.params.status});
    if(!machine){
        res.status(404);
        throw new Error("Invalid Status Name!");
    }
    res.status(200).json(machine);


}));


// Getting machine by their MachineId
router.route('/machineid/:machineid').get(asyncHandler(async (req,res)=>{
    const machine = await Inventory.findOne({machineId: req.params.machineid});
    if(!machine){
        res.status(404);
        throw new Error("Machine not found or invalid Machine Id");
    }
    res.status(200).json(machine);
}));


// Sending Inventory Values to DataBase
router.route('/').post(asyncHandler(async (req,res)=>{
    console.log("The request body is:",req.body);
    const{machineId,PadQty,machineLocation,machineStatus} = req.body;
    if(!machineId || !PadQty){
        res.status(404);
        throw new Error("All Fields are Mandatory..");
    }
    
    const inventory = await Inventory.create({
        machineId : req.body.machineId,
        machineLocation: req.body.machineLocation,
        PadQty: req.body.PadQty,
        machineStatus: req.body.machineStatus
        
    });
    res.status(200).json(inventory);
}));



module.exports = router;