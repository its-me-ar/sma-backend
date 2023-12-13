
const { Router } = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const { getNotificationsByID, updateNotificationStatus } = require("../controller/notifications.controller");

const router = Router();

router.get("/", authMiddleware, getNotificationsByID);
router.put("/:id",authMiddleware,updateNotificationStatus)

module.exports = router;
