# notize

notize is basic TypeScript notify template for multiple notifiers like email, sms, etc. Notifiers listen to their own queue and send notifications according to their own functioning as soon as a message is received as follows.

Json notify schema:

```js
{
    template: "PLAIN_TEXT | <another template name>", // if it is "PLAIN_TEXT" we don't use any template, we send data directly.
    from: {}, // Sender info
    to: {},  // Reciver info
    data: {
        // Words to change and their values in the template
        // key: value,
        // or just string for "PLAIN_TEXT" type
    },
    date: ""// the date the message was sent to the queue, it is optional.
}
```

**Table of Contents:**

- [Usage](#usage)
  - [Installation](#installation)
  - [Set Environment Variables](#set-environment-variables)
  - [Start Queues](#start-queues)
  - [Run Project](#run-project)
- [Contribution](#contribution)
- [License](#license)

## Usage

### Installation

Install the source code

```bash
git clone git@github.com:saracalihan/notize.git
cd notize
```

Install depencencies

```bash
npm i
```

### Set Environment Variables

Copy `sample.env` to `.env` file then set environment variables like RabbitMQ settings.

```bash
copy sample.env .env
```

### Start Queues

We use RabbitMQ on Docker for message queues.

```bash
docker compose up -d
```

### Run Project

**For development**:

Restarts project when a file is saved.

```bash
npm run start:dev
```

**For production**:

Build TypeScript code to JavaScript.

```bash
npm run build
```

Run code

```bash
npm run start
```

## Contribution

## License

This project is under the [MIT License](./LICENSE).
