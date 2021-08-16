import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '@devdezyn/hospitality-app-common'
import { Password } from '../../utils/password'
import User from '../../models/user.model'
import { kafkaWrapper } from '@src/kafka-wrapper'
import { AuthSignupProducer } from '@src/events/producers/auth-signup-producer'

export const signup = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const newUser = new User({ fullname, email, password, roles: ['customer'] })
  await newUser.save()

  // Produce event
  await new AuthSignupProducer(kafkaWrapper.client).produce({
    id: newUser._id,
    fullname: newUser.fullname,
    email: newUser.email,
    password: newUser.password,
    version: 1,
  })

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
    },
    process.env.JWT_AUTH_SECRET!
  )

  // Store it on session object
  req.session = {
    jwt: userJwt,
  }

  res.status(201).send(newUser)
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials')
  }

  const passwordsMatch = await Password.compare(existingUser.password, password)
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid Credentials')
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_AUTH_SECRET!
  )

  // Store it on session object
  req.session = {
    jwt: userJwt,
  }

  res.status(200).send(existingUser)
}

export const currentUser = async (req: Request, res: Response) => {
  res.send({
    status: true,
    data: req.currentUser || null,
    message: 'retrieved successfully',
  })
}
