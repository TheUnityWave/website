// s180216
// SegAlpB7763dmznm
// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB=()=>{
  mongoose.connect(process.env.MONGO_URI,{
      dbName:"UNITYWAVE"
  }).then(()=>{
      console.log("connected to database");
  }).catch((err)=>{
      console.log(`some err occured while connecting to database:${err}`);
  })
}

module.exports = connectDB;
