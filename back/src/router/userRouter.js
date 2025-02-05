import { Router } from "express";
import { userController } from "../controller/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js"

export const router = Router();

// Routes publiques
router.post("/login", userController.login);


// Routes protégées
router.get("/users", authenticateToken, userController.index);
router.get("/users/:id(\\d+)", authenticateToken, userController.show);
router.post("/users", authenticateToken, userController.store);
router.patch("/users/:id(\\d+)", authenticateToken, userController.update);
router.delete("/users/:id(\\d+)", authenticateToken, userController.destroy);
