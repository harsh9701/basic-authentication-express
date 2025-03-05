const express = require("express");
const router = express.Router();
const { signup, signing, logout, getProfile } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/profile", isAuthenticated, getProfile);
router.post("/signup", signup);
router.post("/login", signing);
router.post("/logout", logout);

module.exports = router;