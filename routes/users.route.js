import express from "express";
import {
  createUserCtr,
  loginUserCtr,
} from "../controllers/users.controllers.js";

const router = express.Router();

router.post("/newuser", createUserCtr);
router.post("/loginuser", loginUserCtr);
export default router;
