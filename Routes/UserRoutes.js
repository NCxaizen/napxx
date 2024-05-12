
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/UserSchema');
const app = express();

// Getting all User Details......

router.route('/').get(asyncHandler(async (req,res)=>{

    const user = await User.find();
    res.status(200).json(user);

    

}));
// Getting Particular User Details(Searching by id)

router.route('/:id').get(asyncHandler( async (req,res)=>{
    const userids = await User.findById(req.params.id);
    if(!userids){
        res.status(404);
        throw new Error("User not Found..");
    }

    res.status(200).json(userids);

}));

// Getting the values using username
router.route('/username/:username').get(asyncHandler(async (req, res) => {
    const user = await User.findOne({ UserName: req.params.username });
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    res.status(200).json(user);
}));

// Getting the values using UserId
router.route('/userid/:userid').get(asyncHandler(async (req,res)=>{
    const user = await User.findOne({UserId: req.params.userid});
    if(!user){
        res.status(404);
        throw new Error("User not found!");
    }
    res.status(200).json(user);
}));


// Sending User Values to DataBase
router.route('/').post(asyncHandler(async (req,res)=>{
    console.log("The request body is:",req.body);
    const{UserId,UserName,PadUsed} = req.body;
    if(!UserId || !UserName || !PadUsed){
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }
    const user = await User.create({
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        PadUsed: req.body.PadUsed
    });
    res.status(200).json(user);
}));

module.exports = router;
