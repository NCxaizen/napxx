
const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const database = require('./database');
const cors = require('cors');
const app = express();



const port = process.env.PORT || 5000;


// app.use((req, res, next) => {
//     const allowedIP = ['192.168.1.34','192.168.1.36','192.168.1.38','192.168.1.39','192.168.1.40','127.0.0.1','192.168.39.79','192.0.0.2','192.168.39.148','192.168.39.8','192.168.39.223']; // Replace with the IP address you want to allow

//     // Get the IP address of the client making the request
//     const clientIP = req.ip || req.connection.remoteAddress;
//     console.log(clientIP);

//     // Check if the client's IP matches the allowed IP
//     if (allowedIP.includes(clientIP)) {
//         // If the IP matches, allow the request to continue
//         next();
//     } else {
//         // If the IP doesn't match, send a forbidden response
//         res.status(403).send('Access Denied');
//     }
// });


app.use(express.json());  
app.use(bodyParser.json());
app.use(cors());



app.use('/user',require('./Routes/UserRoutes'));
app.use('/inventory',require('./Routes/InventoryRoutes'));
app.use('/mac',require('./Routes/MachineRoute'));


app.listen(port,'0.0.0.0',()=>{
    console.log(`Server Running on port: ${port}`);
})
