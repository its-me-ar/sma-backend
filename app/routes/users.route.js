const { Router } = require("express");
const {
  register,
  getAllUsers,
  login,
  updateProfile,
  getUserByID,
  getNonFriends,
  sendFriendRequest,
  actionOnfriendRequest,
} = require("../controller/users.controller");
const authMiddleware = require("../middleware/auth.middleware");
const handleFileUpload = require("../middleware/uploadMiddleware");

const router = Router();

router.post("/", register);

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserByID);
router.put("/:id", authMiddleware, handleFileUpload, updateProfile);
router.get("/friends/find-friends",authMiddleware, getNonFriends);
router.post("/friends/send-request",authMiddleware, sendFriendRequest);
router.post("/friends/request-action",authMiddleware, actionOnfriendRequest);
router.post("/auth", login);

module.exports = router;
