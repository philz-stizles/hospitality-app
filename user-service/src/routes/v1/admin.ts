import express from 'express'
import { listPrivateProfiles } from '../../controllers/v1/user.controller'

const router = express.Router()

router.get('/api/v1/user/listPrivateProfiles', listPrivateProfiles)

export default router
