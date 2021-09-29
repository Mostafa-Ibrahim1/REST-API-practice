const express = require("express");
const router = express.Router();
const { readUser, updateUser, deleteUser } = require("./user-controller");

router.route("/:id").get(readUser).put(updateUser).delete(deleteUser);

module.exports = router;
