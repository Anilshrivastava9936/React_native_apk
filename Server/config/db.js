const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connect to Database ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`eroor in db ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
