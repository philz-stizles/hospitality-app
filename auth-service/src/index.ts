import mongoose from 'mongoose'
import chalk from 'chalk'
import app from './app'
import dotenv from 'dotenv'
import { kafkaWrapper } from './kafka-wrapper'
import { seedUsers } from './models/seeder'

dotenv.config()

const start = async () => {
  if (!process.env.JWT_AUTH_SECRET) {
    throw new Error('JWT_AUTH_SECRET must be defined')
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI must be defined')
  }

  if (!process.env.KAFKA_CLIENT_ID) {
    throw new Error('KAFKA_CLIENT_ID must be defined')
  }

  if (!process.env.KAFKA_BROKERS) {
    throw new Error('KAFKA_BROKERS must be defined')
  }

  try {
    kafkaWrapper.connect(
      process.env.KAFKA_CLIENT_ID,
      JSON.parse(process.env.KAFKA_BROKERS) as string[]
    )

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log(chalk.green('Connected to MongoDb!!!'))

    // Seed users data
    await seedUsers()
  } catch (error) {
    console.error(chalk.red(error.message))
  }

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(chalk.green(`Listening on port ${PORT}!`))
  })
}

start()
