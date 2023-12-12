const { Router } = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const {
  createPost,
  getAllPost,
  addCommnet,
  getPostByID,
  getPostsByTag,
  getDiscover,
} = require("../controller/post.controller");
const handleFileUpload = require("../middleware/uploadMiddleware");

const router = Router();

router.post("/", authMiddleware, handleFileUpload, createPost);
router.get("/", authMiddleware, getAllPost);
router.get("/:id", getPostByID);
router.get("/feeds/:tag", authMiddleware, getPostsByTag);
router.get("/discover", getDiscover);
router.post("/comment", authMiddleware, addCommnet);

module.exports = router;
