import { Router } from "express";
import BlogController from "./controller/blog";

const baseURL = "/api/blogs";
const router = Router();

router.get(baseURL, BlogController.getAll);
router.post(baseURL, BlogController.create);
router.put(`${baseURL}/:id`, BlogController.update);
router.delete(`${baseURL}/:id`, BlogController.remove);

export default router;
