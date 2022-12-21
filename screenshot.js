const puppeteer = require("puppeteer");
const next = require("next/dist/server/lib/start-server");

async function main() {
	const app = await next.startServer({
		dir: __dirname,
		hostname: "localhost",
		port: 3000,
	});
	const appUrl = `http://${app.hostname}:${app.port}`;
	console.log(`started server on ${app.port}, url: ${appUrl}`);
	await app.prepare();

	console.log("launching browser ");

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({
		width: 1280,
		height: 720,
		deviceScaleFactor: 2,
	});
	await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);

	console.log("opening page");

	await page.goto("http://localhost:3000/");

	console.log("taking screenshot");

	await page.screenshot({ path: __dirname + "/out/README.png", captureBeyondViewport: true, fullPage: true, type: "png" });

	console.log("done. closing browser + server");

	await app.close();

	await browser.close();
	process.exit();
}

main();
