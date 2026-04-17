import express from "express"
import {sellerMiddleware} from "../middlewares/user.middleware.js"
import { createProductController, getAllProductsController } from "../controllers/product.controller.js"
import multer from "multer"
import { createProductValidator } from "../validators/product.validator.js"

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const router = express.Router()

/**
 * @Create product api
 * @POST
 */
router.post("/", sellerMiddleware, createProductValidator, upload.array("productImages", 7), createProductController)

/**
 * @Get All product api
 * @GET
 */
router.get("/seller", sellerMiddleware, getAllProductsController)

export default router