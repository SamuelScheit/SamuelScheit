import Link from "next/link";
export const NEXTRA_INTERNAL = Symbol.for("__nextra_internal__");
import { pageMap } from "../.next/static/chunks/nextra-page-map-.mjs";

type Page = {
	name: string;
	route: string;
	frontMatter: {
		title: string;
		date?: string;
		author?: string;
		description?: string;
	};
};

export function BlogPosts() {
	const blog = pageMap.find((x) => x.name === "blog");
	if (!blog) return null;

	let posts = blog.children
		.reduce((acc, x) => {
			return acc.concat(x.children as any);
		}, [] as Page[])
		.map((x) => ({ ...x, frontMatter: { ...x.frontMatter, date: x.frontMatter?.date ? new Date(x.frontMatter.date) : new Date() } }))
		.sort((a, b) => b.frontMatter.date.getTime() - a.frontMatter.date.getTime());

	return (
		<section className="blogposts" id="blog">
			<h2>Blog</h2>

			<div className="posts">
				{posts.map(({ frontMatter, route }) => (
					<Link prefetch={false} href={route} key={route} className="post">
						<h3 className="title">{frontMatter.title}</h3>
						{frontMatter.description && (
							<p className="description">
								{frontMatter.description}
								{frontMatter.date && (
									<span className="date">
										{new Date(frontMatter.date).toLocaleDateString("en-US", {
											dateStyle: "medium",
										})}
									</span>
								)}
							</p>
						)}
					</Link>
				))}
			</div>
		</section>
	);
}
