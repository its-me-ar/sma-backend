const express = require("express")
const router = express.Router()
const userRouter = require("./users.route")
const postRouter = require("./post.route")
const feedRouter = require("./feeds.route")
router.use("/users", userRouter)
router.use("/post",postRouter)
router.use("/feeds",feedRouter)
module.exports = router