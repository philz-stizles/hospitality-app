import {
  Producer,
  Topics,
  AuthSignupEvent,
} from '@devdezyn/hospitality-app-common'

export class AuthSignupProducer extends Producer<AuthSignupEvent> {
  // readonly prevents a property of a class from being changed.
  readonly topic: Topics.AuthSignup = Topics.AuthSignup
}
