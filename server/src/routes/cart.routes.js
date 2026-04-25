import { Router } from "express";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { cartValidation } from "../validators/cart.validator.js";
import { addToCartController } from "../controllers/cart.controller.js";

const router = Router()

/**
 * @POST Method
 * @Api /api/cart/add/:productId/:variantId
 * @Desc -> Add item to cart
 */

router.post(
  "/add/:productId/:variantId",
  authMiddleware,
  cartValidation,
  addToCartController
);

export default router