const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/picta";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectToMongo;