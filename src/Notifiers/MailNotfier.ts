import { log } from "console";
import { ConfigService } from "../ConfigService";
import { MAIL_NOTIFIER_TEMPLATE_TYPES, NOTIFIER_TYPES } from "../Constants/Notifier";
import { INotifier, IQueueValue } from "../Interfaces";
import QueueAdapter from "../QueueAdapter";


class MailNotfier implements INotifier {
  type = NOTIFIER_TYPES.MAIL;
  templates: Record<string, string>
  queue: QueueAdapter;
  constructor() {
    const {
      queueName,
      url
    } = ConfigService.getMailNotifierConfig();
    this.queue = new QueueAdapter(url, queueName);
    this.templates = {};
    this.queue.connect().then(() => {
      this.templates = this.readTemplates();
      this.consumeQueue();
    })
  }
  consumeQueue(): void {
    try {
      this.queue.consume((buffer) => {
        // parse data
        let value: IQueueValue = JSON.parse(buffer.content.toString());

        if (!value.template || value.template === '') {
          throw new Error("Empty template type!");
        }
        let message = '';
        if (value.template === MAIL_NOTIFIER_TEMPLATE_TYPES.PLAIN_TEXT && typeof value.data === 'string') {
          message = value.data;
        } else {
          message = this.loadTemplate(value.template, value.data as object);
          console.log({ mailer: message });
        }
        // send notfication

      })
    } catch (error) {

    }

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
      throw new Error(`Invalid template type: ${type}`);
    }

    Object.entries(data).forEach(([key, value]: [string, any]) => {
      template = template.replaceAll(`{{${key}}}`, value)
    });

    return template;
  }
  sendNotfication() {
    throw new Error("Method not implemented.");
  }
}

export default MailNotfier;
