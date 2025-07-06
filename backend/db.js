const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = () => {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      process.exit(1);  // exit process if connection fails
    });
};

module.exports = connectToMongo;
