import { ConfigService } from "../ConfigService";
import { INotifier, IQueueValue } from "../Interfaces";
import QueueAdapter from "../QueueAdapter";

class ErrorNotifier implements INotifier {
  type='ErrorNotifier';
  queue: QueueAdapter;

  constructor() {
    let errorConfig = ConfigService.getErrorQueueConfig();
    this.queue = new QueueAdapter(errorConfig.url, errorConfig.name);
    this.queue.connect().then(() => {
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
  sendNotfication(data: IQueueValue) {
   console.error({error: data});
  }

};

export default ErrorNotifier;
