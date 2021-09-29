const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.createNewToken = (user) => {
  return jwt.sign({ id: user.id, Role: user.Role }, `${process.env.JWT_KEY}`, {
    expiresIn: "15d",
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, `${process.env.JWT_KEY}`);
}; //Needs a try catch
