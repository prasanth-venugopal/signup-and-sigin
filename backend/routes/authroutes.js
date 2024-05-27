import express from 'express'
const router = express.Router()
import { Signup, Login } from '../controller/auth.js'

router.post("/", Signup)
router.post("/login", Login)

export default router;