const express = require("express");
const connectToMongoDB = require("../config/mongoose");
const app = express();
const port = process.env.PORT || 3000;
const blogRoute = require("../resources/blog-post/blog-post-route");
const userRoute = require("../resources/user/user-route");
const protect = require("../auth/protect");
const signUpAndInRoute = require("../auth/signup-signin/signUp&In-route");
app.use(express.json());
app.use(signUpAndInRoute);
app.use("/user", protect, userRoute);
app.use("/blog", protect, blogRoute);

exports.start = async () => {
  app.listen(port, () => {
    console.log(`Server is up on ${port}`);
  });
  await connectToMongoDB();
};
