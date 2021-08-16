import express from 'express'
import { read } from '@src/controllers/v1/room.controller'

const router = express.Router()

router.route('/api/v1/rooms/:id').get(read)

export default router
