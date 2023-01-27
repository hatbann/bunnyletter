const express = require("express");
const router = express.Router();
const Cuser = require("../controller/Cuser");

router.post("/join", Cuser.postJoin);

module.exports = router;
