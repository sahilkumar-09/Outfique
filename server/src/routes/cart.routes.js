import { Router } from "express";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { cartValidation, validateIncrementItemQuantity } from "../validators/cart.validator.js";
import {
  addToCartController,
  getAllCartController,
  incrementQuantityController,
  decrementQuantityController,
  deleteQuantityController,
  createOrderController,
  verifyOrderPaymentController,
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

/**
 * @POST method
 * @API -> /api/cart/payment/create/order
 * @Desc -> Checkout cart and create order
 */

router.post("/payment/create/order", authMiddleware, createOrderController);

/**
 * @POST method
 * @API -> /api/cart/payment/verify/order
 * @Desc -> Verify order payment
 */

router.post("/payment/verify/order", authMiddleware, verifyOrderPaymentController);

export default router