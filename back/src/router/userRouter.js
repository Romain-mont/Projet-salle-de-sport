import { Router } from "express";
import { userController } from "../controller/userController.js";

export const router = Router();

router.get("/users", userController.index)
router.get("/users/:id(\\d+)", userController.show)
router.post("/users", userController.store)
router.patch("/users/:id(\\d+)", userController.update)
router.delete("/users/:id(\\d+)",userController.destroy)
