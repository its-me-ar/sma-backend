const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const uploadMedia = require("../libs/uploadMedia");

dotenv.config();

const register = async (_req, res) => {
  // #swagger.tags = ['Register User']
  const { email, password } = _req.body;
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        message: "User exists",
      });
    }
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getAllUsers = async (_req, res) => {
  // #swagger.tags = ['Get All Users']
  try {
    const users = await User.find({});
    res.status(200).json({ message: "User List", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const login = async (_req, res) => {
  // #swagger.tags = ['Login']
  const { email, password } = _req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordVaild = await bcrypt.compare(password, user.password);
    if (!isPasswordVaild) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateProfile = async (_req, res) => {
  try {
    const { user, params, body, fileBuffer } = _req;
    const { name, bio, password } = body;
    let image = "";
    if (user?.userId !== params?.id) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    if (fileBuffer) {
      const fileData = await uploadMedia(
        fileBuffer,
        user?.userId,
        "user",
        "profile"
      );
      image = fileData?.secure_url;
    }

    const updateFields = {};

    if (name) updateFields.name = name;
    if (password) {
      updateFields.password = await bcrypt.hash(password,10)
    };
    if (bio) updateFields.bio = bio;
    if (image) updateFields.image = image;

    if (Object.keys(updateFields).length > 0) {
      const updateUser = await User.findByIdAndUpdate(
        user?.userId,
        {
          $set: updateFields,
        },
        {
          new: true,
        }
      );
      return res
        .status(201)
        .json({ message: "Profile Updated", user: updateUser });
    }

    return res.status(404).json({ message: "No fields to update" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  getAllUsers,
  login,
  updateProfile,
};
