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
import signupRouter from './routes/v1/signup'
import signinRouter from './routes/v1/signin'
import currentUserRouter from './routes/v1/current-user'

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

app.use(signupRouter)
app.use(signinRouter)
app.use(currentUserRouter)

app.all('*', async (_req, _res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export default app
