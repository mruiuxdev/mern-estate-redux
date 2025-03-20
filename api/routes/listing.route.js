import { Router } from "express";
import { creatingListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.post("/create", verifyToken, creatingListing);

export default router;
