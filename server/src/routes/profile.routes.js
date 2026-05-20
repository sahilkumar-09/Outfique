import express from "express"
import { authMiddleware } from "../middlewares/user.middleware.js"
import { profileValidator } from "../validators/profile.validator.js"
import {addProfileDetailController, getProfileDetailController} from "../controllers/profile.controller.js"

const router = express.Router()

/**
 * @POST method
 * @Api -> /api/profile/add-detail/:userid
 */

router.post(
  "/add-details/:userId",
  profileValidator,
  authMiddleware,
  addProfileDetailController,
);

/**
 * @GET method
 * @Api -> /api/profile/get-detail/:userid
 */

router.get("/get-details", authMiddleware, getProfileDetailController)

export default router