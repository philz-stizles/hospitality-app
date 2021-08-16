import express from 'express'
import { list } from '@src/controllers/v1/reservation.controller'
import { requireAuth } from '@devdezyn/hospitality-app-common'

const router = express.Router()

router.route('/api/v1/reservations').get(requireAuth, list)

export default router
