const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    birthdayDate: Date,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "blog-post" }],
  },
  { timestamps: true }
);
//findByIdAndUpdate
userSchema.pre("save", function (next) {
  const user = this;
  if (!this.isModified("password")) {
    console.log("!");
    return next();
  }
  bcrypt.hash(user.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

const User = mongoose.model("user", userSchema);

module.exports = User;
