import express from 'express'
import { update } from '@src/controllers/v1/user.controller'
import { requireAuth } from '@devdezyn/hospitality-app-common'

const router = express.Router()

router.route('/api/v1/users').put(requireAuth, update)

export default router
