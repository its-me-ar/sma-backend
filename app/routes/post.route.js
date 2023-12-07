const { Router } = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const { createPost, getAllPost, addCommnet, getPostByID } = require("../controller/post.controller");
const handleFileUpload = require("../middleware/uploadMiddleware");

const router = Router();

router.post("/", authMiddleware, handleFileUpload, createPost);
router.get("/", authMiddleware, getAllPost);
router.get("/:id", getPostByID);
router.post("/comment", authMiddleware, addCommnet);

module.exports = router;
