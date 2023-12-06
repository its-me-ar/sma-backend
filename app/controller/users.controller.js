const User = require("../models/users.model");

const register = async (_req, res) => {
  // #swagger.tags = ['Register User']
  const { email, password } = _req.body;
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        error: "User exists",
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

module.exports = {
  register,
  getAllUsers,
};
