class Reporter {
	_globalConfig = null;
	_options = null;

	constructor(globalConfig, options) {
		this._globalConfig = globalConfig;
		this._options = options;
	}

	onRunComplete(contexts, results) {
		console.log(`end all test`);
		//console.log(`Custom reporter output: ${JSON.stringify(results, null, 2)}`);
		/*console.log('GlobalConfig: ', this._globalConfig);
		console.log('Options: ', this._options);*/
	}

	onRunStart(aggregatedResults, options) {
		console.log(`start all test`);
		/*console.log(
			`onRunStart aggregatedResults: ${JSON.stringify(
				aggregatedResults,
				null,
				2
			)}`
		);*/
		/*console.log(`onRunStart options: ${JSON.stringify(options, null, 2)}`);*/
	}

	onTestStart(test) {
		console.log(`start a test file`);
	}

	onTestResult(test, testResult, aggregatedResults) {
		console.log(`End a test file `);
		//console.log(`onTestResult test: ${JSON.stringify(test, null, 2)}`);
		/*
				console.log(
					`onTestResult testResult: ${JSON.stringify(testResult, null, 2)}`
				);

				console.log(
					`onTestResult aggregatedResults: ${JSON.stringify(
						aggregatedResults,
						null,
						2
					)}`
				);
				*/
	}

	getLastError() {
		if (this._shouldFail) {
			return new Error("my-custom-reporter.js reported an error");
		}
	}
}

module.exports = Reporter;