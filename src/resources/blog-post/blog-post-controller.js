const User = require("../user/user-model");
const BlogPost = require("./blog-post-model");

exports.createBlogPost = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const blog = await BlogPost.create(req.body);
    const blogRender = await blog.populate("createdBy", "username profilePic");
    const user = await User.findById(req.user.id);
    user.blogs.push(blog);
    user.save();

    res.json({ newBlogData: blogRender });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.readBlogPost = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await BlogPost.findById(id).populate(
      "createdBy",
      "username profilePic"
    );

    res.json({ blogData: blog });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.readAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const doc = await BlogPost.find({})
      .populate("createdBy", "username profilePic")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    res.json({ blogs: doc });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBlog = await BlogPost.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("createdBy", "username profilePic");

    res.json({ updatedBlog });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBlog = await BlogPost.findByIdAndDelete(id).populate(
      "createdBy",
      "username profilePic"
    );

    res.json({ deletedBlog });
  } catch (e) {
    res.json({ error: e });
  }
};
