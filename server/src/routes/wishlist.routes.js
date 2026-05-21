import express from "express"
import { authMiddleware } from "../middlewares/user.middleware.js"
import {
  addToWishListController,
  getAllWishlistController,
  deleteWishlistController,
} from "../controllers/wishlist.controller.js";

const router = express.Router()

router.post("/add/:productId/:variantId", authMiddleware, addToWishListController)

router.get("/", authMiddleware, getAllWishlistController)

router.delete("/:productId/:variantId", authMiddleware, deleteWishlistController)

export default router