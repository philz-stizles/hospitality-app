import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
// Errors & Middlewares
import {
  NotFoundError,
  currentUser,
  errorHandler,
} from '@devdezyn/hospitality-app-common'
// Routes
import { listRouter, readRouter, updateRouter } from './routes/v1'

const app = express()

app.set('trust proxy', true)

app.use(helmet())

app.use(cors())

app.use(compression())

app.use(express.json())

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
)

app.use(currentUser)

app.use(listRouter)
app.use(readRouter)
app.use(updateRouter)

app.all('*', async (_req, _res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export default app
