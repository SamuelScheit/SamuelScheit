import data from "./data.json";
import fs from "fs";
import { fetchCommits, fetchRepositories } from "./util";

// (async () => {
// 	const repos = await fetchRepositories();

// 	fs.writeFileSync(__dirname + "/data.json", JSON.stringify(repos, null, "\t"));
// })();

(async () => {
	const commits = await fetchCommits(data);

	fs.writeFileSync(__dirname + "/commits.json", JSON.stringify(commits, null, "\t"));
	fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data, null, "\t"));
})();
