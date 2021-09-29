const express = require("express");
const router = express.Router();
const {
  createBlogPost,
  readBlogPost,
  updateBlogPost,
  deleteBlogPost,
  readAllBlogs,
} = require("./blog-post-controller");
//all mounted on /blog
router.route("/newblog").post(createBlogPost);

router.route("/allblogs").get(readAllBlogs);
router.route("/:id").get(readBlogPost).delete(deleteBlogPost);
router.route("/update/:id").put(updateBlogPost);

module.exports = router;
