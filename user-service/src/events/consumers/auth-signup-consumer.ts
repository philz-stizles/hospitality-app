import {
  Consumer,
  Topics,
  AuthSignupEvent,
} from '@devdezyn/hospitality-app-common'
import { KafkaMessage } from 'kafkajs'
import { groupId } from './group-id'
import User from '@src/models/user.model'

export class AuthSignupConsumer extends Consumer<AuthSignupEvent> {
  // readonly prevents a property of a class from being changed.
  readonly topic: Topics.AuthSignup = Topics.AuthSignup
  groupId = groupId

  //
  async onMessage(data: AuthSignupEvent['data'], msg: KafkaMessage) {
    console.log('msg', msg)
    console.log('data', data)
    const { fullname, email, password } = data

    await new User({
      fullname,
      email,
      password,
    }).save()
  }
}
