import { Kafka } from 'kafkajs'

class KafkaWrapper {
  private _client?: Kafka

  get client() {
    if (!this._client) {
      throw new Error('Cannot access Kafka client before connecting')
    }

    return this._client
  }

  connect(clientId: string, brokers: string[]) {
    this._client = new Kafka({
      clientId,
      brokers,
      connectionTimeout: 3000, // Time in milliseconds to wait for a successful connection. The default is 1000.
      requestTimeout: 25000, // Time in milliseconds to wait for a successful request. The default value is 30000.
    })
  }
}

export const kafkaWrapper = new KafkaWrapper()
