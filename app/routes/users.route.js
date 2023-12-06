const { Router } = require("express");
const { register, getAllUsers } = require("../controller/users.controller");

const router = Router();

router.post("/", register);

router.get("/", getAllUsers);

module.exports = router;
