const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
