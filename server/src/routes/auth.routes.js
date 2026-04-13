import {Router} from "express"
import { validateRegister } from "../validators/auth.validator.js"
import {
  userRegisterController,
//   userLoginController,
} from "../controllers/auth.controller.js";

const router = Router()

/**
 * @Register_Routes
 * @POST
 */
router.post("/user/register", validateRegister, userRegisterController);

/**
 * @Login_Routes
 * @POST 
 */

// router.post("/user/login", userLoginController);

export default router
