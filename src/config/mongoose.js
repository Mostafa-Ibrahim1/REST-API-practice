const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.connectToMongoDB = () => {
  mongoose
    .connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection to DB is successful");
    });
};
