import express from "express";
const router = express.Router();
import {
  createUserCtr,
  loginUserCtr,
} from "../controllers/users.controllers.js";

router.post("/newuser", createUserCtr);
router.post("/loginuser", loginUserCtr);
export default router;
