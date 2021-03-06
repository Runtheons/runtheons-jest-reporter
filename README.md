# Runtheons Jest Reporter

- [Introduction](https://github.com/Runtheons/runtheons-jest-reporter/tree/main#introduction)
- [Getting started](https://github.com/Runtheons/runtheons-jest-reporter/tree/main#getting-started)
  - [Prerequisites](https://github.com/Runtheons/runtheons-jest-reporter/tree/main#prerequisites)
  - [Installation](https://github.com/Runtheons/runtheons-jest-reporter/tree/main#installation)
- [Use](https://github.com/Runtheons/runtheons-jest-reporter/tree/main#use)
- [Improve Security](https://github.com/Runtheons/runtheons-jest-reporter/tree/main#improve-security)
- [Tester](https://github.com/Runtheons/runtheons-jest-reporter/tree/main#tester)
  - [Example of use](https://github.com/Runtheons/runtheons-jest-reporter/tree/main#example-of-use)

# Introduction

This repository create a Jest Reporter
If the aforementioned documentation is not clear or contains errors, please report it immediately to the email address **bugs-documentation@runtheons.com** or report the issue here on GitHub. Please be extremely clear and precise in the description of the issue so that moderators can correct it as soon as possible.

# Getting started

## Prerequisites

1. Git
2. Node: any 14.x version starting with v14.5.0 or greater

## Installation

1. `npm install https://github.com/Runtheons/runtheons-jest-reporter#v1.0.0` to add the package to the project

# Use

In your `package.json` add reporter in jest configuration

```json
{
	"name": "my_app",
	"version": "x.x.x",
	"dependencies": {
		...
	},
	"devDependencies": {
		"jest": "^27.2.2"
	},
	"scripts": {
		"test": "jest "
	},
	"jest": {
		"testEnvironment": "node",
		"reporters": [
			"default",
      [
				"./node_modules/@runtheons/jest-reporter",
				{
					"output": true,
					"outputType": "json",
					"outputFile": "./tests/status.json",
					"notify": true,
					"nodemailer": { ... },
					"receiver": "example@mail.com"
				}
			]
		]
	}
}
```

As you can see, in reporter you have to specify the paramenter

| Paramenter | Type    | Description                                                                                              |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------- |
| output     | boolean | If is `true` the reporter generate an output                                                             |
| outputType | string  | Available type: <ul><li>json</li></ul><br>Default: `json`                                                |
| outputFile | string  | Specify the output filepath <br> Default: `./status.json`                                                |
| notify     | boolean | If is `true` the reporter send an email notification                                                     |
| nodemailer | object  | Nodemailer config <br> See [https://nodemailer.com/smtp/](https://nodemailer.com/smtp/) for more details |
| receiver   | string  | Email where send notification                                                                            |

# Improve Security

For security reason we advice set jest config in `jest.config.js` file, here an example

```javascript
const config = require("./config.js");

module.exports = {
  testMatch: ["**/*.test.js"],
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "./../node_modules/@runtheons/jest-reporter",
      {
        output: true,
        outputType: "json",
        outputFile: "./tests/status.json",
        notify: true,
        nodemailer: config.email,
        receiver: "example@email.com",
      },
    ],
  ],
};
```

# Tester

You can use our tester script for test automatically

Use `node_modules/@runtheons/jest-reporter/tester.js`, it run `npm run test` automatically

By default it run test every day at 06:00:00, but you can specify the time using `process.env.EVERY`, it must be in cron format (See [node-schedule](https://www.npmjs.com/package/node-schedule) for more details)

## Example of Use

In example we create an `ecosystem.config.js` file for PM2, setting tester every 5min

```javascript
module.exports = {
  apps: [
    {
      name: "Runtheons Backend App",
      script: "index.js",
      watch: true,
      env: {
        PORT: 3001,
      },
    },
    {
      name: "Tester",
      script: "./node_modules/@runtheons/jest-reporter/tester.js",
      watch: true,
      env: {
        EVERY: "*/5 * * * * *",
      },
    },
  ],
};
```
