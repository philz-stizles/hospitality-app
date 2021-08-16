import express from 'express'
import {
  create,
  list,
  read,
  update,
  remove,
} from '@src/controllers/v1/room.controller'
import { requireAuth } from '@devdezyn/hospitality-app-common'

const router = express.Router()

router.route('/api/v1/rooms').post(requireAuth, create).get(list)

router
  .route('/api/v1/rooms/:id')
  .get(read)
  .put(requireAuth, update)
  .delete(requireAuth, remove)

export default router
