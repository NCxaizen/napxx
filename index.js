const express = require('express')
const app = express()
const port = 5000
const mongodb = require('./db')
const path = require("path");
app.use(express.static(path.join(__dirname, "build")));
mongodb();
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use((req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.use(express.json())

app.use('/api/', require('./Routes/CreateUser'))

app.use('/api/', require('./Routes/LoginUser'))

app.use('/api/', require('./Routes/FoodData'))

app.use('/api/', require('./Routes/OrderData'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})