const { verifyToken } = require("./jwtUtils");
const User = require("../resources/user/user-model");

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  //If there is a token and in the right format
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  } else {
    //Verifying the token
    const token = bearer.split("Bearer ")[1];
    try {
      const payload = verifyToken(token);
      const user = await User.findById(payload.id).select("-password");
      if (!user) {
        return res.status(401).end();
      } else {
        req.user = user;
        next();
      }
    } catch (e) {
      res.send({ message: "Not auth" });
    }
  }
};
module.exports = protect;
