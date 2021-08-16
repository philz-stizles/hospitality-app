import express from 'express'
import { body } from 'express-validator'
import { currentUser } from '@src/controllers/v1/auth.controller'

const router = express.Router()

router.post('/api/v1/auth/currentuser', currentUser)

export default router
