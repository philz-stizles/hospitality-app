import express from 'express'
import { cancel } from '@src/controllers/v1/reservation.controller'
import { requireAuth } from '@devdezyn/hospitality-app-common'

const router = express.Router()

router.route('/api/v1/reservations/:id').patch(requireAuth, cancel)

export default router
