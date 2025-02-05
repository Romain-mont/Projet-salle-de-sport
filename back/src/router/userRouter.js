import { Router } from "express";
import { userController } from "../controller/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js"

export const router = Router();

// Routes publiques
router.post("/login", userController.login);


// Routes protégées
router.get("/users", userController.index);
router.get("/users/:id(\\d+)", userController.show);
router.post("/users", userController.store);
router.patch("/users/:id(\\d+)", userController.update);
router.delete("/users/:id(\\d+)", userController.destroy);
