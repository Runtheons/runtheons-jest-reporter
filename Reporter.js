const fs = require("fs");
const moment = require("moment");

class Reporter {
	_globalConfig = null;
	_options = null;

	constructor(globalConfig, { output, outputType, outputFile, nodemailer }) {
		this._globalConfig = globalConfig;

		if (
			nodemailer == undefined ||
			nodemailer.host == undefined ||
			nodemailer.auth == undefined ||
			nodemailer.auth.user == undefined ||
			nodemailer.auth.pass == undefined
		) {
			throw "ERROR Jest Reporter - nodemailer config not set";
		}

		this._options = {
			output: output || true,
			outputType: outputType.toLowerCase() || "json",
			outputFile: outputFile || "./status.json",
			nodemailer: nodemailer,
		};
	}

	async onRunComplete(contexts, results) {
		results.start = moment(results.startTime).format("YYYY-MM-DD HH:mm:ss");

		if (this._options.output) {
			switch (this._options.outputType) {
				case "json":
					fs.writeFileSync(
						this._options.outputFile,
						JSON.stringify(results, null, 4)
					);
					break;
				default:
					break;
			}
		}
		if (results.numFailedTests > 0) {
			await this.sendNotify();
		}
	}

	/*
	onRunStart(aggregatedResults, options) {
		console.log(`start all test`);
	}

	onTestStart(test) {
		console.log(`start a test file`);
	}

	onTestResult(test, testResult, aggregatedResults) {
		console.log(`End a test file `);
	}

	getLastError() {
		if (this._shouldFail) {
			return new Error("my-custom-reporter.js reported an error");
		}
	}
	*/

	async sendNotify() {
		const nodemailer = require("nodemailer");

		const transporter = await nodemailer.createTransport(
			this._options.nodemailer
		);

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: "",
			to: "",
			subject: "Autotester failed",
			text: "Autotester failed",
		});

		console.log("Message sent: %s", info.messageId);
	}
}

module.exports = Reporter;