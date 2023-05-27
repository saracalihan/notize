import { type } from "os";
import QueueAdapter from "./QueueAdapter";

export interface IRabbitMQConfig {
  url: string;
}

export interface INotifier {
  type: string;
  templates: Record<string, string>;
  queue: QueueAdapter | null;
  /**
   * Consume to queue
   */
  consumeQueue(): void;
  /**
   * Load all templates in to memmory
   */
  readTemplates(): Array<string>;
  /**
   * Get template from memmory
   * @param type Template type/name
   */
  getTemplate(type: string): string;
  /**
   * Replace values to template.
   * @param type Template type/name
   * @param data Values object
   */
  loadTemplate(type: string, data: object): string;
  sendNotfication(): any;
}

export interface IQueueValue {
  template: string;
  from: object;
  to: object;
  data: object | string;
  date?: string
}
