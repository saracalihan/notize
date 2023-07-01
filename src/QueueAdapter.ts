import amqplib from 'amqplib';
import { ConfigService } from "./ConfigService";
import { IRabbitMQConfig } from "./Interfaces";

class QueueAdapter {
  config: {
    url: string,
    name: string,
  };
  connection: any;

  constructor(url: string, name: string) {
    if (name.trim() === '') {
      throw new Error('[ Queue Adapter ]: consume() / Queue name cant be empty!');
    }

    this.config = {
      url,
      name
    };
  }

  async connect() {
    this.connection = await amqplib.connect(this.config.url);
  }

  async createChannel(assert = false) {
    let ch = await this.connection.createChannel();

    if (assert) {
      await ch.assertQueue(this.config.name);
    }

    return ch;
  }

  async consume(listener: (msg: any, channel: any) => any, autoAck = true) {


    let ch = await this.createChannel(true);

    ch.consume(this.config.name, async (msg: any) => {
      await listener(msg, ch);
      if (autoAck) {
        ch.ack(msg);
      }
    });
  }

  async send(data: WithImplicitCoercion<string | Uint8Array | readonly number[]> | object, channel?: any) {
    const isChannelPass = channel;
    if (!isChannelPass) {
      channel = await this.createChannel();
    }

    if(typeof data === "object"){
      data = JSON.stringify(data);
    }

    channel.sendToQueue(this.config.name, Buffer.from(data));

    if (!isChannelPass) {
      channel.close();
    }
    return channel;
  }

  close() {
    this.connection.close();
  }
}

export default QueueAdapter;
