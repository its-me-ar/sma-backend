const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const db = async () => {
  try {
    const res = await mongoose.connect(MONGODB_URL);
    console.log(`DB connected : ${res.connection.host}`);
  } catch (error) {
    return error
  }
};
module.exports = db;
