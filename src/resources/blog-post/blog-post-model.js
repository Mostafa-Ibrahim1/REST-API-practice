const mongoose = require("mongoose");

const blogPostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    postBody: { type: String, required: true },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("blog-post", blogPostSchema);

module.exports = BlogPost;
