const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectToMongo;