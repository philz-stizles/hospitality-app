import {
  Producer,
  Topics,
  RoomCreatedEvent,
} from '@devdezyn/hospitality-app-common'

export class RoomCreatedProducer extends Producer<RoomCreatedEvent> {
  // readonly prevents a property of a class from being changed.
  readonly topic: Topics.RoomCreated = Topics.RoomCreated
}
