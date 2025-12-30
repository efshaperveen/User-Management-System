const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  updateProfileValidator,
  changePasswordValidator,
} = require("../validators/user.validator");

const {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserStatus
} = require("../controllers/user.controller");

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfileValidator, validate, updateProfile);
router.put(
  "/change-password",
  auth,
  changePasswordValidator,
  validate,
  changePassword
);
router.get("/", auth, role("admin"), getAllUsers);
router.put("/:id/status", auth, role("admin"), updateUserStatus);

module.exports = router;
