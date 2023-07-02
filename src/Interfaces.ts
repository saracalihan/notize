import { type } from "os";
import QueueAdapter from "./QueueAdapter";

export interface IRabbitMQConfig {
  url: string;
}

export interface INotifier {
  type: string;
  queue: QueueAdapter | null;
  /**
   * Consume to queue
   */
  consumeQueue(): void;
  sendNotfication(data: IQueueValue): any;
}

export interface IQueueValue {
  template: string;
  from: object;
  to: object;
  data: object | string;
  date?: string
}
