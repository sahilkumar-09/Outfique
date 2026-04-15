import {Router} from "express"
import { validateRegister, validatorLoginUser } from "../validators/auth.validator.js"
import {
  userRegisterController,
  userLoginController,
} from "../controllers/auth.controller.js";

const router = Router()

/**
 * @Register_Routes
 * @POST
 */
router.post("/register", validateRegister, userRegisterController);

/**
 * @Login_Routes
 * @POST 
 */

router.post("/login", validatorLoginUser, userLoginController);


export default router
