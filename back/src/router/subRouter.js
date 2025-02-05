import { Router } from "express";
import { subscriptionController } from "../controller/subscriptionController.js";

export const router = Router();

router.get("/subscription", subscriptionController.index);
router.get("/subscription/:id(\\d+)", subscriptionController.show);
router.get("/subscription/subUsers",subscriptionController.getAllSubscriptionsWithUsers,);
router.post("/subscription", subscriptionController.store);
router.patch("/subscription/:id(\\d+)", subscriptionController.update);
router.delete("/subscription/:id(\\d+)", subscriptionController.destroy);
router.post("/users/:userId/subscription/:subscriptionId",subscriptionController.subscribeUser);
router.put("/users/:userId/subscribe/:subscriptionId",subscriptionController.updateUserSubscription);
router.delete("/users/:id/subscribe",subscriptionController.removeUserSubscription);
