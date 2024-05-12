const express = require('express');
const router = express.Router();

router.post('/fooddata', async (req,res) =>{
    try {
        //console.log(global.food_data);
        //console.log(global.cate_data)
        res.send([global.food_data,global.cate_data])


        //const response = await response.json
        
        
    } catch (error) {
        
    }
})



module.exports = router;