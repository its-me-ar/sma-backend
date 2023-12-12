const Post = require("../models/posts.model");
const Media = require("../models/media.model");
const Tag = require("../models/tags.model");
const Comment = require("../models/comment.model");
const uploadMedia = require("../libs/uploadMedia");
const createPost = async (_req, res) => {
  // #swagger.tags = ['Create Post']
  try {
    const { user, body, fileBuffer, mediaType } = _req;
    const { data } = body;
    await addTags(data);

    const post = await Post.create({
      userId: user.userId,
      data,
    });

    if (fileBuffer) {
      const fileData = await uploadMedia(
        _req.fileBuffer,
        post?._id,
        "post",
        "feeds",
        mediaType
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

const addTags = async (data) => {
  let _tags = [];
  if (data) {
    _tags = data.match(/#(\w+)/g) || [];
  }
  const tags = _tags.map((tag) => tag.slice(1));
  const insertedTag = await Promise.all(
    tags.map(async (tagName) => {
      const tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        const newTag = new Tag({ name: tagName });
        return newTag.save();
      }
      return tag;
    })
  );
  return insertedTag;
};

const getAllPost = async (_req, res) => {
  // #swagger.tags = ['Get all post']
  try {
    const posts = await Post.find({})
      .populate("userId")
      .populate("media")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      })
      .sort({ createdAt: -1 })
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

const addCommnet = async (_req, res) => {
  // #swagger.tags = ['Add comment on post']
  const { user, body } = _req;
  const { post_id, comment } = body;

  try {
    const newComment = await Comment.create({
      userId: user.userId,
      post_id,
      comment,
    });

    await Post.findByIdAndUpdate(
      post_id,
      {
        $push: { comments: newComment._id },
      },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "Comment added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getPostByID = async (_req, res) => {
  // #swagger.tags = ['Get post by Id']
  const { params } = _req;
  try {
    if (params?.id) {
      const posts = await Post.findById(params?.id)
        .populate({
          path: "userId",
          select: "image name",
        })
        .populate("media")
        .populate({
          path: "comments",
          populate: {
            path: "userId",
            model: "User",
            select: "image name",
          },
        })
        .sort({ createdAt: -1 })
        .exec();
      return res.json({
        posts,
      });
    }
    return res.json({
      posts: [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getPostsByTag = async (req, res) => {
  try {
    const { params } = req;
    if (!params?.tag) {
      return res.status(400).json({ error: "Tag data is required." });
    }

    const posts = await Post.find({
      data: { $regex: new RegExp(params?.tag, "i") },
    })
      .populate("userId")
      .populate("media")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
          select: "image name",
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  createPost,
  getAllPost,
  addCommnet,
  getPostByID,
  getPostsByTag,
};
