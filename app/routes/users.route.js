const { Router } = require("express");
const {
  register,
  getAllUsers,
  login,
  updateProfile,
} = require("../controller/users.controller");
const authMiddleware = require("../middleware/auth.middleware");
const handleFileUpload = require("../middleware/uploadMiddleware");

const router = Router();

router.post("/", register);

router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, handleFileUpload, updateProfile);

router.post("/auth", login);

module.exports = router;
