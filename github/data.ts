import data from "./data.json";
import fs from "fs";
import { fetchCommits, fetchRepositories } from "./util";

(async () => {
	const repos = await fetchRepositories();

	fs.writeFileSync(__dirname + "/data.json", JSON.stringify(repos, null, "\t"));
})();
