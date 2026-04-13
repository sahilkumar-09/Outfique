import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

export const validateRegister = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .trim()
    .notEmpty()
    .withMessage("Email is required"),
  body("contact")
    .matches(/^\d{10}$/)
    .trim()
    .notEmpty()
    .withMessage("Invalid contact format"),
  body("password")
    .isLength({ min: 8 })
    .trim()
    .notEmpty()
    .withMessage("Invalid password format"),
  body("fullName")
    .isLength({ min: 2 })
    .trim()
    .notEmpty()
    .withMessage("Invalid full name format"),
  body("isSeller")
    .isBoolean()
    .withMessage("isSeller must be an boolean value"),
  validate,
];
