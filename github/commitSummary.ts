import fs from "fs";
import data from "./data.json";
import Groq from "groq-sdk";

const client = new Groq({});

// const arr = data.filter((x) => x.nameWithOwner === "spacebarchat/server");
// const arr = data.filter((x) => x.nameWithOwner === "spacebarchat/client");
// const arr = data.filter((x) => x.nameWithOwner === "respondchat/respond");
// const arr = data.filter((x) => x.nameWithOwner === "x127f/Odium-DEPRECATED");
const arr = data.filter((x) => x.nameWithOwner === "SamuelScheit/missing-native-js-syntax");
// const arr = data;

for (const repo of arr) {
	const set = new Set<string>();

	if (!repo.commits) continue;
	// if (repo.commitSummary) continue;

	const allCommits =
		repo.commits.reduce((acc: any, x: any) => {
			if (!x.message) return acc;
			if (x.message === "init") return acc;
			if (x.message.startsWith("Merge ")) return acc;
			if (x.message.startsWith("Revert ")) return acc;
			if (x.message.startsWith("New translations ")) return acc;
			if (set.has(x.message)) return acc;

			set.add(x.message);

			return acc + x.message + "\n";
		}, "") || "";

	const downloads = (repo.releases.nodes as any[]).reduce(
		(acc: any, x: any) => x.releaseAssets.nodes.reduce((a: any, y: any) => a + y.downloadCount, 0) + acc,
		0
	);

	const commitCount = repo.defaultBranchRef.target.history.totalCount;

	const prompt = `${allCommits}

name: ${repo.nameWithOwner}
description: ${repo.description}
private: ${repo.isPrivate}
fork: ${repo.isFork}
language: ${repo.primaryLanguage?.name || ""}
stars: ${repo.stargazerCount}
downloads: ${downloads}
commits: ${commitCount}

Do not narrate what you are doing.
Create a category list summary of only important things were implemented.
`;
	// Start with "I've worked" and explain what I did in the ego perspective.

	console.log(prompt);

	const result = await client.chat.completions.create({
		messages: [{ role: "user", content: prompt }],
		model: "llama-3.1-70b-versatile",
		// model: "llama3-8b-8192",
	});
	const answer = result.choices[0].message.content;

	console.log(answer);

	repo.commitSummary = answer;

	fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data, null, "\t"));
}
