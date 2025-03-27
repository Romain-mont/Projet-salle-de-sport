import { Router } from "express";
import { courseController } from "../controller/courseController.js";

export const router = Router();

router.get("/course", courseController.index);
router.get("/teacher/:teacherId/course", courseController.teacherCourse);
router.get("/course/:id(\\d+)", courseController.show);
router.post("/course", courseController.store);
router.patch("/course/:id(\\d+)", courseController.update);
router.delete("/course/:id(\\d+)", courseController.destroy);
