const mongoose = require("mongoose");
const MediaSchema = mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", MediaSchema);
module.exports = Media;
