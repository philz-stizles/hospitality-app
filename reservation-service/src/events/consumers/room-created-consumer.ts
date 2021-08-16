import {
  Consumer,
  Topics,
  RoomCreatedEvent,
} from '@devdezyn/hospitality-app-common'
import { KafkaMessage } from 'kafkajs'
import { groupId } from './group-id'

export class RoomCreatedConsumer extends Consumer<RoomCreatedEvent> {
  // readonly prevents a property of a class from being changed.
  readonly topic: Topics.RoomCreated = Topics.RoomCreated
  groupId = groupId

  //
  async onMessage(data: RoomCreatedEvent['data'], msg: KafkaMessage) {
    console.log(msg)
  }
}
