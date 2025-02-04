
import { Router } from "express";
import {router as userRouter} from "./userRouter.js"
import {router as subRouter} from "./subRouter.js"
import {router as courseRouter} from "./courseRouter.js"
import {router as bookedRouter} from "./bookedRouter.js"

export const router = Router()

router.use(userRouter)
router.use(subRouter)
router.use(courseRouter)
router.use(bookedRouter)