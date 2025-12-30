const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  signupValidator,
  loginValidator,
} = require("../validators/auth.validator");

const {
  signup,
  login,
  getMe,
} = require("../controllers/auth.controller");

router.post("/signup", signupValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.get("/me", auth, getMe);

module.exports = router;
