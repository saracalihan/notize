import { IRabbitMQConfig } from './Interfaces';
import { NOTIFIER_TYPES } from './Constants/Notifier';
import { log } from 'console';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export class ConfigService {
  constructor() {
    log(process.env)
  }

  static get(key: string): string {
    return process.env[key] || '';
  }

  static getNumber(key: string): number {
    return Number(this.get(key));
  }

  static getMailNotifierConfig() {
    return {
      url: this.get('MAIL_QUEUE_URL'),
      queueName: this.get('MAIL_QUEUE_NAME'),
    }
  }

  static getSelectedNotifiers() {
    return {
      useMailNotfier: this.get('USE_MAIL_NOTIFIER'),
      useLogNotfier: this.get('USE_LOG_NOTIFIER'),
      useAllNotifiers: this.get('USE_ALL_NOTIFIERS'),
    }
  }
}
