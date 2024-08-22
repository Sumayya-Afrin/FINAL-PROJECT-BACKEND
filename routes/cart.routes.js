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

router.get("/", auth, getAllCartItemCtrl);
router.post("/", auth, AddToCartCtrl);
router.delete("/del", auth, deleteFromCartByIdCtrl);
router.get("/:userId", tocheckuserid);

export default router;
