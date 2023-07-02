import { ConfigService } from "./ConfigService";
import QueueAdapter from "./QueueAdapter";
import MailNotifier from './Notifiers/MailNotfier';
import { MAIL_NOTIFIER_TEMPLATE_TYPES } from "./Constants/Notifier";
import NotificationException from "./Exceptions/NotificationException";
import OtherException from "./Exceptions/OtherException";
import ErrorNotifier from "./Notifiers/ErrorNotifier";

let errorQueue: QueueAdapter, mailQueue: QueueAdapter;



async function setup() {
  let errorConfig = ConfigService.getErrorQueueConfig();
  let mailConfig = ConfigService.getMailNotifierConfig();

  errorQueue = new QueueAdapter(errorConfig.url, errorConfig.name);
  mailQueue = new QueueAdapter(mailConfig.url, mailConfig.name);
  // await Promise.all([
  //   errorQueue.connect,
  //   mailQueue.connect,
  // ]);

  await errorQueue.connect();
  await mailQueue.connect();
}

(async () => {
  await setup();
  let mailer = new MailNotifier();
  let errorN = new ErrorNotifier();
  let index = 0;
  setInterval(async () => {
    let message =
    {
      template: MAIL_NOTIFIER_TEMPLATE_TYPES.WELCOME,
      data: {
        username: index
      }
    };
    await mailQueue.send(message);
    console.log({ gonderilen: message });
    index++;
  }, 1000);
})()

// read notification type
// consume queues

process.on('uncaughtException', async (error) => {
  // check error type, if it isnt custom error wrap it.
  if ([NotificationException].filter((errorType) => !(error instanceof errorType)).length > 0) {
    error = new OtherException(error);
  }
  await errorQueue.send(error);
  // mesaj veritabanına eklenmeli
  /*
  mesaj bilgisi + status: caught | handled
  */
})