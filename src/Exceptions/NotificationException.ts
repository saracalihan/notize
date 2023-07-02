import { IQueueValue } from '../Interfaces';

class NotificationException extends Error {
  message: string;
  data: IQueueValue | null;
  date: Date;

  constructor(message: string, data: IQueueValue | null = null, date = new Date() ) {
    super(message);
    this.name = 'NotificationException';
    this.message= message;
    this.data = data;
    this.date = date;
  }

  toJSON(){
    return {
      type: this.name,
      message: this.message,
      data: this.data,
      date: this.date
    }
  }

  toString(){
    return JSON.stringify(this);
  }
}

export default NotificationException;
