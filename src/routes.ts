import { Router } from "express";
import BlogController from "./controller/blog";

const baseURL = "/api/blogs";
const router = Router();

router.get(baseURL, BlogController.getAll);
router.post(baseURL, BlogController.create);

export default router;
