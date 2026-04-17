import express from "express"
import {sellerMiddleware} from "../middlewares/user.middleware.js"
import { createProductController } from "../controllers/product.controller.js"
import multer from "multer"

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const router = express.Router()

/**
 * @Create product api
 */
router.post("/", sellerMiddleware, upload.array("image", 7), createProductController)

export default router