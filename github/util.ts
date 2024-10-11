import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { remark } from "remark";
import data from "./data.json";
import html from "remark-html";

const GraphQLOctokit = Octokit.plugin(paginateGraphQL).plugin(paginateRest);
const octokit = new GraphQLOctokit({
	auth: process.env.GITHUB_TOKEN,
	request: {
		fetch: async (url: any, options: any) => {
			if (!options.headers) options.headers = {};
			options.headers["X-Github-Next-Global-ID"] = "1";
			return fetch(url, options);
		},
	},
});

export async function fetchRepositories() {
	const user = await octokit.request("GET /user", {});
	const user_id = user.data.node_id;

	const organizations = await octokit.graphql.paginate(
		`query paginate($cursor: String) {
			viewer {
				organizations(first: 100) {
					nodes {
						repositories(first: 100, before: $cursor) {
							totalCount
							nodes {
								id
							}
							pageInfo {
								endCursor
								hasNextPage
							}
						}
					}
				}
			}
		}`
	);

	const topRepositories = await octokit.graphql.paginate(
		`query paginate($cursor: String) {
			viewer {
				topRepositories(
					first: 100
					after: $cursor
					orderBy: {field:CREATED_AT,direction:DESC}
				) {
					totalCount
					nodes {
						id
					}
					pageInfo {
						endCursor
						hasNextPage
					}
				}
			}
		}`
	);

	const repos = organizations.viewer.organizations.nodes
		.map((x: any) => x.repositories.nodes)
		.flat()
		.concat(topRepositories.viewer.topRepositories.nodes)
		.map((x: any) => x.id);

	const ids = Array.from(new Set(repos).values());

	const results = [] as any[];

	console.log("Fetching", ids.length, "repositories");

	while (ids.length) {
		const batch = ids.splice(0, 50);

		const result: any = await octokit.graphql(
			`query paginate($ids: [ID!]!, $user_id: ID) { 
				nodes(ids: $ids) {
					... on Repository {
						id
						description
						homepageUrl
						url
						name
						nameWithOwner
						owner {
							login
						}
						createdAt
						updatedAt
						openGraphImageUrl
						usesCustomOpenGraphImage
						primaryLanguage {
							color
							name
						}
						archivedAt
						discussions {
							totalCount
						}
						releases(first: 10) {
							totalCount
							nodes {
								createdAt
								releaseAssets(first: 100) {
									totalCount
									nodes {
										downloadCount
									}
								}
							}
						}
						forkCount
						isFork
						languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
							totalCount
							totalSize
							edges {
								size
								node {
									color
									name
								}
							}
						}
						stargazerCount
						isPrivate
						defaultBranchRef {
							name
							id
							target {
								... on Commit {
									history(author: {id: $user_id}, first: 0) {
										totalCount
									}
								}
							}
						}
						object(expression: "master:README.md") {
							... on Blob {
								text
							}
						}
					}
				}
			}`,
			{
				ids: batch,
				user_id: user_id,
			}
		);
		results.splice(results.length, 0, ...result.nodes);
		console.log("Fetched:", results.length, "left:", ids.length, "repositories");
	}

	return results;
}

export async function fetchCommits(repos: typeof data) {
	const user = await octokit.request("GET /user", {});
	const user_id = user.data.node_id;

	console.log(user_id, user.data.email);

	const map = new Map<string, (typeof data)[0]>();

	for (const repo of repos) {
		if (!repo.defaultBranchRef) continue;
		if (repo.defaultBranchRef.target.history.totalCount === 0) continue;

		map.set(repo.defaultBranchRef.id, repo);
	}

	const ids = Array.from(map.keys());

	const results = {} as any;

	console.log("Fetching", ids.length, "repos");

	for (const id of ids) {
		const repo = map.get(id)!;
		const result: any = await octokit.graphql.paginate(
			`query paginate($id: ID!, $user_id: ID, $cursor:String) {
				node(id: $id) {
					... on Ref {
						name
						target {
							... on Commit {
								history(author: {id: $user_id}, first: 100, after: $cursor) {
									totalCount
									nodes {
										committedDate
										message
										messageBody
									}
									pageInfo {
										endCursor
										hasNextPage
									}
								}
							}
						}
					}
				}
			}`,
			{
				user_id: user_id,
				id,
			}
		);
		const branchName = result.node.name;
		const commits = result.node.target.history.nodes;
		results[repo.nameWithOwner] = commits;
		console.log(repo.nameWithOwner, branchName, commits.length);
		repo.commits = commits;
	}

	return results;
}

export async function getRepositories() {
	return handleRepositories(data);
}

const markdownParser = remark().use(html);

export function handleRepositories(repos: typeof data) {
	return (
		repos
			.filter((x) => x.defaultBranchRef?.target.history.totalCount)
			.filter((x) => x.commitSummary)
			.filter((x) => !x.isFork)
			// .filter((x) => !x.isPrivate)
			.map((repo) => {
				repo = { ...repo };
				if (!repo.usesCustomOpenGraphImage) {
					repo.openGraphImageUrl = `https://opengraph.githubassets.com/00866a04aaff55ce104de1b3388a42894e97c57764db3344cecd3dc3d5f50777/${repo.url.replace(
						"https://github.com/",
						""
					)}`;
				}
				if (repo.commitSummary) {
					repo.commitSummary = markdownParser.processSync(repo.commitSummary).toString();
				}

				const downloads = (repo.releases.nodes as any[]).reduce(
					(acc: any, x: any) => x.releaseAssets.nodes.reduce((a: any, y: any) => a + y.downloadCount, 0) + acc,
					0
				);

				const commitCount = repo.defaultBranchRef!.target.history.totalCount;

				return {
					...repo,
					downloads,
					commitCount,
				};
			})
			.sort((a, b) => {
				// const aDate = new Date(a.createdAt);
				// const bDate = new Date(b.createdAt);

				// const diff = bDate.getTime() - aDate.getTime();

				// return diff;
				const aCommits = a.commitCount;
				const bCommits = b.commitCount;

				return bCommits - aCommits;
			})
	);
}
