const express = require('express');
const router = express.Router();
const user = require('../models/User')
const {body, validationResult} = require('express-validator')

const becrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const jwtSecret = "MynameisAshutoshandiwillbecomemultimillionareby26"

router.post("/loginuser", [
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min : 5})

],
async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: 'Try login with Correct ' });

    }
    let email = req.body.email;
    try {
        let user_data = await user.findOne({email})

        if(!user_data){
            return res.status(400).json({ error: 'Try login with Correct Email' });
        }

        let comparePassword = await becrypt.compare(req.body.password, user_data.password)

        // if(comparePassword) {
        //     const authToken = jwt.sign({email : user_data.email}, jwtSecret , {expiresIn: "15m",})
        // }
        
        // user_data.authToken = authToken;
        // if (res.status(201)) {
        //     return res.json({ status: "ok", data: authToken});
        //   }else {
        //     return res.json({ error: "error" });
        //   }

        if(!comparePassword){
            return res.status(400).json({ error: 'Try login with Correct Password' });

        }

        const data = {
            user : {
                id : user_data._id
            }
        }
        //success : true
        const authToken = jwt.sign(data,jwtSecret,{expiresIn: "15m",})

        user_data.authToken = authToken;

        res.json({
            success: true,
            "authToken": authToken
        })
        

    } catch (error) {
        console.log(error);
        res.json({
            success: false
        })

    }

})

module.exports = router;