const mongoose = require('mongoose');
const mongourl = 'mongodb+srv://Ashu9336:abcd1234@foodie.btnw620.mongodb.net/?retryWrites=true&w=majority&appName=Foodie'

const mongodb = async () => {
  await mongoose.connect('mongodb+srv://Ashu9336:abcd1234@foodie.btnw620.mongodb.net/Foodie_mern?retryWrites=true&w=majority&appName=Foodie')
    .then(async (err, result) => {
      console.log("connected");

      const fetched_data = await mongoose.connection.db.collection("food_data");
      const category_data = await mongoose.connection.db.collection("fooditems");

      // fetched_data.find({}).toArray(async function (err, data) {
      //   const category_data = await mongoose.connection.db.collection("fooditems");

      //   category_data.find({}).toArray(async function (err, cat_data) {
      //     if (err) console.log(err)
      //     else {
      //       console.log(cat_data)
      //     }
      //   })
      // });
      const data = await fetched_data.find({}).toArray();
      const cat_data = await category_data.find({}).toArray();


      // global variable

      //console.log(cat_data);
      global.food_data = data;// Global Object
      global.cate_data = cat_data;
      //console.log(global.food_data)
    })
}
module.exports = mongodb;




