const express = require("express")
const router = express.Router()
const userRouter = require("./users.route")
const postRouter = require("./post.route")
router.use("/users", userRouter)
router.use("/post",postRouter)
module.exports = router