import express from 'express'
import { update } from '@src/controllers/v1/room.controller'
import { requireAuth } from '@devdezyn/hospitality-app-common'

const router = express.Router()

router.route('/api/v1/rooms/:id').put(requireAuth, update)

export default router
