import {validationResult, body} from "express-validator"

const validate = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty) {
        return res.status(400)
      .json({ message: "Validation error", error: error.array() });
    }
}

export const profileValidator = [
    body("user").notEmpty().withMessage("User id is required"),
    body("cart").notEmpty().withMessage("Cart is required"),
    body("address").notEmpty().withMessage("Address is required"),
    validate
]