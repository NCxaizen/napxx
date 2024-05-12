const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Machine = require('../models/MachineSchema');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Getting all details...


router.route('/').get(asyncHandler(async(req,res)=>{
    const machine = await Machine.find();
    res.status(200).json(machine);
}));

// Getting the details using MAC ADDRESS
router.route('/macaddress/:macaddress').get(asyncHandler(async(req,res)=>{
  const machine = await Machine.findOne({MacAddress: req.params.macaddress});
  if(!machine){
    res.status(404);
    throw new Error("Machine with this MacAdrress not found!");
  }
  res.status(200).json(machine);
}));

// Getting the status using STATUS
router.route('/status/:status').get(asyncHandler(async(req,res)=>{
  const machine = await Machine.find({MachineStatus: req.params.status});
  if(!machine){
    res.status(404);
    throw new Error("Invalid Status name or Status doesn't exists");
  }
  res.status(200).json(machine);
}));

// Getting the details using PadQty
router.route('/pad/:pad').get(asyncHandler(async(req,res)=>{
  const padQty = parseInt(req.params.pad);
  const machine = await Machine.find({PadQty: {$lte:padQty}});
  if(!machine || machine.length===0){
    res.status(404);
    throw new Error("Machine with pad qty lower than or equal to " + padQty + " not found!");
  }
  res.status(200).json(machine);
}))

// Sending data to database 

router.route('/').post(asyncHandler(async (req, res) => {
    const { macAddress, machineStatus, padQty , machineLocation} = req.body;
    let existingMachine = await Machine.findOne({ MacAddress: macAddress });
  
    if (existingMachine) {
      // Document with the same MacAddress already exists, update values other than MacAddress
      existingMachine.MachineStatus = machineStatus;
      existingMachine.PadQty =  padQty;
      existingMachine.MachineLocation = machineLocation;
      await existingMachine.save();
      res.status(200).json({ message: 'Document updated successfully.' });
    } else {
      // MacAddress doesn't exist, add a new document
      const newMachine = new Machine({
        MacAddress: macAddress,
        MachineStatus: machineStatus,
        PadQty:padQty,
        MachineLocation:machineLocation
      });
  
      await newMachine.save();
      res.status(200).json({ message: 'Document added successfully.' });
    }
  })); 

module.exports = router;