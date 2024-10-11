import { GetStaticProps, InferGetStaticPropsType } from "next";
import data from "./data.json";
import Image from "next/image";
import { handleRepositories } from "./util";

export const getStaticProps = (async (context) => {
	// const repos = data.viewer.topRepositories.nodes
	const repos = await handleRepositories(data);

	return { props: { repos } };
}) satisfies GetStaticProps<{
	repos: typeof data;
}>;

export default function GitHub(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const { repos } = props;

	console.log(repos);

	return (
		<div className="_flex _flex-col _gap-10">
			{repos.map((repo) => {
				return (
					<div target="_blank" rel="noreferrer" href={repo.url} key={repo.url}>
						<Image loader={(p) => p.src} width={1200 * 0.25} height={600 * 0.25} src={repo.openGraphImageUrl} alt={repo.name} />
						<div>{repo.nameWithOwner}</div>
						<div>{repo.description}</div>
						<div dangerouslySetInnerHTML={{ __html: repo.commitSummary || "" }} style={{ fontFamily: "inherit" }} />
					</div>
				);
			})}
		</div>
	);
}
