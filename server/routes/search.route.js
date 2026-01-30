import { Router } from "express";
import { body } from "express-validator";
import { search } from "../controllers/search.controller.js";

const router = Router();

router.post(
  "/search",
  [
    body("searchQuery")
      .exists()
      .withMessage("searchQuery is required")
      .isString()
      .withMessage("searchQuery must be a string")
      .trim()
      .isLength({ min: 3 })
      .withMessage("searchQuery must be at least 3 characters"),

    body("topK")
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage("topK must be an integer between 1 and 20"),
  ],
  search.searchPost,
);

export default router;
