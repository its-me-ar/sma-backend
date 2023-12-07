const mongoose = require("mongoose");
const PostSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    data: {
      type: String,
      require: true,
    },
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
