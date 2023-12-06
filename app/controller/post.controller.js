const multer = require("multer");
const Post = require("../models/posts.model");
const Media = require("../models/media.model");
const uploadMedia = require("../libs/uploadMedia");
const createPost = async (_req, res) => {
  // #swagger.tags = ['Create Post']
  try {
    const { user, body, fileBuffer } = _req;
    const { data } = body;
    let tags = [];
    if (data) {
      tags = data.match(/#(\w+)/g) || [];
    }
    const post = await Post.create({
      userId: user.userId,
      data,
      tags,
    });

    if (fileBuffer) {
      const fileData = await uploadMedia(
        _req.fileBuffer,
        post?._id,
        "post",
        "feeds"
      );
      const media = await Media.create({
        post_id: post?._id,
        url: fileData?.secure_url,
        type: fileData?.resource_type,
      });
      post.media = media._id;
      await post.save();
    }
    res.status(201).json({ message: "Post Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getAllPost = async (_req, res) => {
  try {
    const posts = await Post.find({})
      .populate("userId")
      .populate("media")
      .exec();
    res.json({
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
module.exports = {
  createPost,
  getAllPost,
};
