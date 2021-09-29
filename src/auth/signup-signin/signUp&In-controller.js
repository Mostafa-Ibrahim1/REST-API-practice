const User = require("../../resources/user/user-model");
const { createNewToken } = require("../jwtUtils");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      res.json({ message: "Email is already in use" });
    } else {
      const newUser = await User.create(req.body);
      const token = createNewToken(newUser);

      res.json({ createdUser: newUser, token: token });
    }
  } catch (e) {
    res.json({ error: e });
  }
};
const checkPassword = (sentPassword, hash) => {
  const match = bcrypt.compare(sentPassword, hash);
  return match;
};
exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.json({ message: "Unable to Login" });
    } else {
      const isvalidPassword = await checkPassword(
        req.body.password,
        user.password
      );
      if (isvalidPassword === false) {
        return res.json({ message: "Incorrect Password" });
      } else {
        const newToken = createNewToken(user);
        return res.json({ token: newToken });
      }
    }
  } catch (e) {
    res.json({ error: e });
  }
};
