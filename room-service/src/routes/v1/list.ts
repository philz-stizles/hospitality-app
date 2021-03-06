import express from 'express'
import { list } from '@src/controllers/v1/room.controller'

const router = express.Router()

router.route('/api/v1/rooms').get(list)

export default router
