const schedule = require("node-schedule");

const every = process.env.EVERY || "*/5 * * * * *" || "0 0 6 * * *"; // 06:00:00 of every days

schedule.scheduleJob("Runtheons Tester", every, async() => {
	const util = require("util");
	const exec = util.promisify(require("child_process").exec);
	try {
		console.log("Run test");
		const { stdout, stderr } = await exec("npm run test --if-present");
		console.log("Test success");
	} catch (e) {
		console.log("Test failed");
	}
});