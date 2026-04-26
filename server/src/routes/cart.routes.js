import { Router } from "express";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { cartValidation, validateIncrementItemQuantity } from "../validators/cart.validator.js";
import {
  addToCartController,
  getAllCartController,
  incrementQuantityController,
  decrementQuantityController,
  deleteQuantityController,
} from "../controllers/cart.controller.js";

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

/**
 * @PATCH method
 * @Api - /api/cart/quantity/increment/:productId/:variantId
 */

router.patch("/quantity/increment/:productId/:variantId", authMiddleware,
  validateIncrementItemQuantity, incrementQuantityController);

/**
 * @PATCH method
 * @Api - /api/cart/quantity/decrement/:productId/:variantId
 */

router.patch("/quantity/decrement/:productId/:variantId", authMiddleware, decrementQuantityController);

/**
 * @DELETE method
 * @Api - /api/cart/delete/:productId/:variantId
 */

router.delete("/delete/:productId/:variantId", authMiddleware, deleteQuantityController);

export default router