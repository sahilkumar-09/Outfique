import { param, body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

export const cartValidation = [
  param("productId").isMongoId().withMessage("Invalid product id"),
  param("variantId").isMongoId().withMessage("Invalid variant id"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  validate,
];

export const validateIncrementItemQuantity = [
  param("productId").isMongoId().withMessage("Invalid product id"),
  param("variantId").isMongoId().withMessage("Invalid variant id"),
  validate
]