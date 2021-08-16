import express from 'express'
import { listPublicProfiles } from '@src/controllers/v1/user.controller'
import { requireAuth } from '@devdezyn/hospitality-app-common'

const router = express.Router()

router.route('/api/v1/users').get(requireAuth, listPublicProfiles)

export default router
