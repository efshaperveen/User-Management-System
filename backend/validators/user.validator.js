const { body } = require("express-validator");

exports.updateProfileValidator = [
  body("fullName")
    .optional()
    .notEmpty()
    .withMessage("Full name cannot be empty"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format"),
];

exports.changePasswordValidator = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password required"),

  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be 8 characters long"),
];
