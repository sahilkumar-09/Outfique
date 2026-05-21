import {Router} from "express"
import { authMiddleware } from "../middlewares/user.middleware"
import {
  addToWishListController,
  getAllWishlistController,
  deleteWishlistController,
} from "../controllers/wishlist.controller";
const router = Router


router.post("/add/:productId/:variantId", authMiddleware, addToWishListController)

router.get("/wishlist", authMiddleware, getAllWishlistController)

router.delete("/wishlist/:productId/:variantId", authMiddleware, deleteWishlistController)

export default router