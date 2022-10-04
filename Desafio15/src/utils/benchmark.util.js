import autocannon from "autocannon";
import { PassThrough } from "stream";
import { serverConfig } from '../config/server.config.js';

function run(url) {
	const buf = [];
	const outputStream = new PassThrough();

	const inst = autocannon({
		url,
		connections: 500,
		duration: 20,
	});

	autocannon.track(inst, { outputStream });

	outputStream.on("data", (data) => buf.push(data));
	inst.on("done", function () {
		process.stdout.write(Buffer.concat(buf));
	});
}


run(`http://localhost:3030/info`);

//run(`http://localhost:${serverConfig.PORT}/info`);
//run(`http://localhost:${serverConfig.PORT}/info/gzip`);