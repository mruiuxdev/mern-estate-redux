import { Router } from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get("/", getUser);
router.post("/update/:id", verifyToken, updateUser);

export default router;
