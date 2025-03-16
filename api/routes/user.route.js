import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";

const route = Router();

route.get("/", getUser);

export default route;
