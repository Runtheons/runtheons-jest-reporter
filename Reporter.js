const fs = require("fs");
const moment = require("moment");

class Reporter {
	_globalConfig = null;
	_options = null;

	constructor(globalConfig, { output, outputType, outputFile }) {
		this._globalConfig = globalConfig;
		this._options = {
			output: output || true,
			outputType: outputType.toLowerCase() || "json",
			outputFile: outputFile || "./status.json",
		};
	}

	onRunComplete(contexts, results) {
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
}

module.exports = Reporter;