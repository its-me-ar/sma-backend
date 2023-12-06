const { Router } = require("express");
const {
  register,
  getAllUsers,
  login,
} = require("../controller/users.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = Router();

router.post("/", register);

router.get("/", authMiddleware, getAllUsers);

router.post("/auth", login);

module.exports = router;
