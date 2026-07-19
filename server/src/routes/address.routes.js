import express from "express";
import {
  createAddressController,
  getAddressByIdController,
  getAddressController,
    setAsDefaultController,
  deleteAddressController,
  updateAddressController,
} from "../controllers/address.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createAddressController);
router.get("/", authMiddleware, getAddressController);
router.get("/:addressId", authMiddleware, getAddressByIdController);
router.patch("/:addressId", authMiddleware, updateAddressController);
router.delete("/:addressId", authMiddleware, deleteAddressController);
router.patch("/:addressId/default", authMiddleware, setAsDefaultController);

export default router;
