import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty) {
    return res
      .status(400)
      .json({ message: "Validation error", error: error.array() });
  }

  next();
};

export const createProductValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("amount")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Amount is required"),
  body("currency").notEmpty().withMessage("Currency is required"),
  validate,
];
