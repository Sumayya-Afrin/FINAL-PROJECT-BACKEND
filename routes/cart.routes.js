import express from "express";
// import cors from "cors";
const router = express.Router();

import { auth } from "../middleware/auth.middleware.js";

import {
  getAllCartItemCtrl,
  AddToCartCtrl,
  deleteFromCartByIdCtrl,
  tocheckuserid,
} from "../controllers/cart.controllers.js";

router.get("/", getAllCartItemCtrl);
router.post("/add", AddToCartCtrl);
router.delete("/del", deleteFromCartByIdCtrl);
router.get("/:userId", tocheckuserid);

export default router;
