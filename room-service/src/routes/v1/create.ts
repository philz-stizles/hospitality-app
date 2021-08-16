import express from 'express'
import { create } from '@src/controllers/v1/room.controller'
import { requireAuth } from '@devdezyn/hospitality-app-common'

const router = express.Router()

router.route('/api/v1/rooms').post(requireAuth, create)

export default router
