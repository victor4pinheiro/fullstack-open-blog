import { Router } from "express";
import BlogController from "./controller/blog";
import UserController from "./controller/user";

enum baseURL {
  blog = "/api/blogs",
  user = "/api/users",
}
const router = Router();

router.get(baseURL.blog, BlogController.getAll);
router.post(baseURL.blog, BlogController.create);
router.put(`${baseURL.blog}/:id`, BlogController.update);
router.delete(`${baseURL.blog}/:id`, BlogController.remove);

router.get(baseURL.user, UserController.getAll);
router.post(baseURL.user, UserController.create);

export default router;
