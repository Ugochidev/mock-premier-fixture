// require dependencies
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//  creating connection to database
const { MONGO_URL } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("server is up and running");
  } catch (error) {
    console.log("server is down");
  }
};
//   exporting modules
module.exports = connectDB();
