import { IQueueValue } from '../Interfaces';

class OtherException extends Error {
  message: string;
  data: IQueueValue | null;
  date: Date;

  constructor(error: any, date = new Date()) {
    super(error.message);
    this.name = 'OtherException';
    this.message = error.message;
    this.data = error?.data ? error.data : null;
    this.date = date;
  }

  toJSON() {
    return {
      type: this.name,
      message: this.message,
      data: this.data,
      date: this.date
    }
  }

  toString() {
    return JSON.stringify(this);
  }
}

export default OtherException;
