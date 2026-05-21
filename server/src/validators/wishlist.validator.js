import {body, param, validationResult} from "express-validator"

const validate = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error.array()
        })
    }
}

export const wishlistValidator = [
    param("productId").isMongoId().withMessage("Invalid product id"),
    param("variantId").isMongoId().withMessage("Invalid variant id"),
    validate
]