import express from 'express'
import { read } from '@src/controllers/v1/user.controller'
import { requireAuth } from '@devdezyn/hospitality-app-common'

const router = express.Router()

router.route('/api/v1/users/:id').get(requireAuth, read)

export default router
