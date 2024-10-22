const mongoose = require("mongoose");
require("dotenv").config();

const Mongo_Uri = process.env.MONGODB_URI;

const initializeDb = async () => {
  try {
    const connection = await mongoose.connect(Mongo_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Database connected");
    }
  } catch (error) {
    console.log(`Connection Failed ${error}`);
  }
};

module.exports = { initializeDb };
