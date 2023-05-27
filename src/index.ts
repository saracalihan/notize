import { ConfigService } from "./ConfigService";
import QueueAdapter from "./QueueAdapter";
import MailNotifier from './Notifiers/MailNotfier';
import { log } from "console";
import { MAIL_NOTIFIER_TEMPLATE_TYPES } from "./Constants/Notifier";


(async () => {
  const {
    queueName,
    url
  } = ConfigService.getMailNotifierConfig();
  let queue = new QueueAdapter(url, queueName);
  await queue.connect();
  let mailer = new MailNotifier()
  // queue.consume((msg: any, ch) => {
  //   //console.log('msg: ' + msg.content.toString());
  // })
  /*
  let index = 0;
  setInterval(async () => {
    let message = JSON.stringify(
      {
        template: MAIL_NOTIFIER_TEMPLATE_TYPES.WELCOME,
        data: {
          username: index
        }
      });
    await queue.send(message);
    console.log(message);
    index++;
  }, 500);
  */
})()



// read notification type
// consume queues
