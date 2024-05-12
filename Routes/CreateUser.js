const express = require('express');
const router = express.Router();
const user = require('../models/User')

const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const becrypt = require('bcryptjs')
const jwtSecret = "MynameisAshutoshandiwillbecomemultimillionareby26"


router.post("/createuser", [

    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })]

    , async (req, res) => {
        let success = false

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Try login with Correct Email' });
        }

        const salt = await becrypt.genSalt();
        let securePassword = await becrypt.hash(req.body.password, salt);
        try {
            await user.create({
                name: req.body.name,

                email: req.body.email,
                location: req.body.location,
                password: securePassword

            }).then(user => {
                const data = {
                    user: {
                        id: user.id
                    } 
                }
                success = true
                const authToken = jwt.sign(data, jwtSecret)  
                res.json({
                    success: true,
                    authToken: authToken
                })

            })
            // res.json({
            //     success: true
            // })

        } catch (error) {
            console.log(error);
            res.json({
                success: false
            })

        }

    })

module.exports = router;