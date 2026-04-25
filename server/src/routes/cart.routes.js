import { Router } from "express";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { cartValidation } from "../validators/cart.validator.js";
import { addToCartController, getAllCartController } from "../controllers/cart.controller.js";

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

/**
 * @GET Method
 * @Api - /api/cart/
 * @Desc -> Get all items from cart
 */

router.get("/", authMiddleware, getAllCartController)

export default router