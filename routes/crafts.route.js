import express from "express";
import {
  editCraftsByIdCtr,
  createCraftByIdCtr,
  deleteCraftByIdCtr,
  getCraftsByIdCtr,
  getCraftsCtr,
} from "../controllers/crafts.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getCraftsCtr);
router.get("/:id", getCraftsByIdCtr);
router.delete("/del/:id", auth, deleteCraftByIdCtr);
router.post("/", createCraftByIdCtr);
router.put("/:id", editCraftsByIdCtr);

export default router;
