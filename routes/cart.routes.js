import express from "express";
// import cors from "cors";
import { Crafts } from "../entities/crafts.entity.js";
import {
  getCraftByIdFromCartCtr,
  deleteCraftFromCartCtr,
  addingCraftsInCartCtr,
  getAllCraftsFromCartCtr,
} from "../controllers/cart.controllers.js";

const router = express.Router();

router.get("/", getAllCraftsFromCartCtr);
router.get("/:id", getCraftByIdFromCartCtr);
router.post("/add", addingCraftsInCartCtr);
router.delete("/del/:id", deleteCraftFromCartCtr);

export default router;
