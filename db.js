const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://AbhinavSingh:NapX@cluster0.kgw1q72.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
db.once('open', () => {
    console.log('Connected to MongoDB');
});
  
db.once('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
  
db.on('reconnected', () => {
    console.log('Reconnected to MongoDB');
});
  
db.on('close', () => {
    console.log('Connection to MongoDB closed');
});
  

module.exports = db;