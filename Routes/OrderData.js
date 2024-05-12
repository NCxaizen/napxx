const express = require('express');
const router = express.Router();

const orders = require('../models/MyOrder');

router.post("/myorders", async (req, res) => {

    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    console.log("1231242343242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await orders.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            console.log(data)
            console.log("1231242343242354", req.body.email)
            await orders.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await orders.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


router.post('/orderdata', async (req, res) => {

    try {

        const mydata = await orders.findOne({email : req.body.email});

        res.send({orderdata: mydata});
        
    } catch (error) {

        res.send("Server Error", error.message)
        
    }

})

module.exports = router