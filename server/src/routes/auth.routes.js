import {Router} from "express"
import { validateRegister, validatorLoginUser } from "../validators/auth.validator.js"
import {
  userRegisterController,
  userLoginController,
  googleSuccessController
} from "../controllers/auth.controller.js";
import passport from "passport";

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

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}))

router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/auth/user/login" }),
  googleSuccessController
)


export default router
