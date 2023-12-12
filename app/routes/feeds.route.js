const { Router } = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const { getPostsByTag, getDiscover } = require("../controller/post.controller");

const router = Router();

router.get("/tag/:tag", authMiddleware, getPostsByTag);
router.get("/discover",authMiddleware, getDiscover);

module.exports = router;
