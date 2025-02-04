import { Router } from "express";
import {bookedController} from "../controller/bookedController.js"
export const router = Router();



router.get("/booked/:id", bookedController.listParticipantsByCourse)
router.post("/booked/",bookedController.store)
router.delete("/booked/:reservation_id", bookedController.destroy)