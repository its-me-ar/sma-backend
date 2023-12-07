const mongoose = require("mongoose");
const TagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique:true
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
