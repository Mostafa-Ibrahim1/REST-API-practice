const User = require("./user-model");
const bcrypt = require("bcryptjs");
exports.readUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("blogs").select("-password");
    res.json({ userProfile: user });
  } catch (e) {
    res.json({ error: e });
  }
};
const modificationCheck = (sentPassword, hash) => {
  const match = bcrypt.compare(sentPassword, hash);
  return match;
}; //if it returns true don't change , if it returns false means that it is a modification
exports.updateUser = async (req, res) => {
  try {
    //I didn't depend on the pre save hook as findByIdAndUpdate by pass hooks so I had to hash the password here if it is changed
    const id = req.params.id;
    const user = await User.findById(id);

    if (req.body.password) {
      const passwordIsNotModified = await modificationCheck(
        req.body.password,
        user.password
      );
      if (passwordIsNotModified) {
        req.body.password = user.password;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
          new: true,
        }).populate("blogs");
        return res.json({ updatedUser });
      } else {
        const hashedPassword = await new Promise((resolve, reject) =>
          bcrypt.hash(req.body.password, 8, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          })
        );
        req.body.password = hashedPassword;

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
          new: true,
        }).populate("blogs");
        console.log(updatedUser);

        return res.json({ updatedUser });
      }
    }
  } catch (e) {
    res.json({ error: e });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id).select("-password");
    res.json({ deletedUser });
  } catch (e) {
    res.json({ error: e });
  }
};
