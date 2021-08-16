import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '@devdezyn/hospitality-app-common'
import { signin } from '@src/controllers/v1/auth.controller'

const router = express.Router()

router.post(
  '/api/v1/auth/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  signin
)

export default router
