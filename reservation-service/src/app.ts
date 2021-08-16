import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import {
  NotFoundError,
  errorHandler,
  currentUser,
} from '@devdezyn/hospitality-app-common'
import {
  createRouter,
  listRouter,
  readRouter,
  cancelRouter,
} from '@src/routes/v1'

const app = express()

app.set('trust proxy', 1)

app.use(helmet())

app.use(cors())

app.use(compression())

app.use(express.json())

app.use(
  cookieSession({
    // name: 'session',
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)

app.use(currentUser)

app.use(createRouter)
app.use(listRouter)
app.use(readRouter)
app.use(cancelRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export default app
