import { Router } from "express";
import { post } from "../controllers/post.controller.js";

const router = Router();

router.get("/posts", post.getPosts);

export default router;
