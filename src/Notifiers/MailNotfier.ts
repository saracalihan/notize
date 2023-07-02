import { ConfigService } from "../ConfigService";
import { MAIL_NOTIFIER_TEMPLATE_TYPES, NOTIFIER_TYPES } from "../Constants/Notifier";
import { INotifier, IQueueValue } from "../Interfaces";
import QueueAdapter from "../QueueAdapter";
import NotificationException from "../Exceptions/NotificationException";


class MailNotfier implements INotifier {
  type = NOTIFIER_TYPES.MAIL;
  templates: Record<string, string>
  queue: QueueAdapter;
  constructor() {
    const {
      name,
      url
    } = ConfigService.getMailNotifierConfig();
    this.queue = new QueueAdapter(url, name);
    this.templates = {};
    this.queue.connect().then(() => {
      this.templates = this.readTemplates();
      this.consumeQueue();
    })
  }
  consumeQueue(): void {
    this.queue.consume((buffer) => {
      // parse data
      let value = JSON.parse(buffer.content.toString());

      this.sendNotfication(value)
    })
  }
  readTemplates(): any {
    return {
      [MAIL_NOTIFIER_TEMPLATE_TYPES.WELCOME]: 'Welcome {{username}}',
    }
  }
  getTemplate(type: string): string {
    return this.templates[type];
  }
  loadTemplate(type: string, data: object): string {
    let template = this.getTemplate(type);
    if (!template) {
      throw new NotificationException(`Invalid template type: ${type}`, data as IQueueValue);
    }

    Object.entries(data).forEach(([key, value]: [string, any]) => {
      template = template.replaceAll(`{{${key}}}`, value)
    });

    return template;
  }
  async sendNotfication(value: IQueueValue) {
    if (!value.template || value.template === '') {
      throw new NotificationException("Empty template type!", value);
    }
    let message = '';
    if (value.template === MAIL_NOTIFIER_TEMPLATE_TYPES.PLAIN_TEXT) {
      if (typeof value.data !== 'string') {
        throw new NotificationException('Wrong data type for PLAIN_TEXT template', value);
      }
      message = value.data;
    } else {
      message = this.loadTemplate(value.template, value.data as object);
    }
    // send notfication
    console.log({ mailer: message });
  }
}

export default MailNotfier;
