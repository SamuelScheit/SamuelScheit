import Link from "next/link";
import { Code, Pre, Table, Td, Th, Tr } from "nextra/components";
import type { MDXComponents } from "nextra/mdx";
import { ComponentProps, ReactElement, ReactNode, RefObject, useRef } from "react";
import { createContext, createRef, useContext, useEffect, useState } from "react";
import type { NextraThemeLayoutProps } from "nextra";
import { MDXProvider } from "nextra/mdx";
import { LayoutProps } from "nextra-theme-blog";
import { createPortal } from "react-dom";
import { Links } from "../Links";
import { Link as ExternalLink } from "../Link";
import Head from "next/head";

const BlogContext = createContext<LayoutProps | null>(null);

export const BlogProvider = BlogContext.Provider;

export const useBlogContext = () => {
	const value = useContext(BlogContext);
	if (!value) {
		throw new Error("useBlogContext must be used within a BlogProvider");
	}
	return value;
};

export const HeadingContext = createContext<RefObject<HTMLHeadingElement | null>>(createRef());

const H1 = ({ children }: { children?: ReactNode }): ReactElement => {
	const ref = useContext(HeadingContext);
	const { opts } = useBlogContext();
	const [showHeading, setShowHeading] = useState(false);
	useEffect(() => {
		if (ref.current && opts.hasJsxInH1) {
			setShowHeading(true);
		}
	}, [opts.hasJsxInH1, ref]);
	return <>{showHeading && createPortal(children, ref.current!)}</>;
};

function HeadingLink({
	tag: Tag,
	children,
	id,
	className,
	...props
}: ComponentProps<"h2"> & { tag: `h${2 | 3 | 4 | 5 | 6}` }): ReactElement {
	return (
		<Tag
			id={id}
			className={
				// can be added by footnotes
				className === "sr-only" ? "_sr-only" : `subheading-${Tag}`
			}
			{...props}
		>
			{children}
			{id && <a href={`#${id}`} className="_not-prose subheading-anchor" aria-label="Permalink for this section" />}
		</Tag>
	);
}

const EXTERNAL_HREF_REGEX = /https?:\/\//;

const A = ({ children, href = "", ...props }: ComponentProps<"a">) => {
	const ComponentToUse = href.startsWith("#") ? "a" : ExternalLink;
	return (
		<ComponentToUse href={href} {...props}>
			{children}
		</ComponentToUse>
	);
};

export const components: MDXComponents = {
	h1: H1,
	h2: (props) => <HeadingLink tag="h2" {...props} />,
	h3: (props) => <HeadingLink tag="h3" {...props} />,
	h4: (props) => <HeadingLink tag="h4" {...props} />,
	h5: (props) => <HeadingLink tag="h5" {...props} />,
	h6: (props) => <HeadingLink tag="h6" {...props} />,
	a: A,
	pre: ({ children, ...props }) => (
		<Pre className="_not-prose" {...props}>
			{children}
		</Pre>
	),
	tr: Tr,
	th: Th,
	td: Td,
	table: (props) => <Table className="_not-prose" {...props} />,
	code: Code,
};

export default function Layout({ children, pageOpts, pageProps, themeConfig }: NextraThemeLayoutProps) {
	const config = { ...themeConfig };
	const { title: pageTitle, frontMatter } = pageOpts;
	const date = new Date(frontMatter.date);
	console.log(frontMatter);
	const tags: string[] = frontMatter.tags?.split(", ") ?? [];

	const ref = useRef<HTMLHeadingElement>(null);
	const title = `${pageTitle}${config.titleSuffix || ""}`;

	return (
		<>
			<div className="main blog">
				<Head>
					<title>{title}</title>
					<meta name="og:description" content={frontMatter.description} />
					{config.head?.({ title, meta: frontMatter })}
				</Head>
				<div className="links-wrapper">
					<Links>
						<Link href="/" title="Back" className="_absolute max-md:_hidden" style={{ left: "30px", top: "40px" }}>
							<svg xmlns="http://www.w3.org/2000/svg" width="2.3rem" height="2.3rem" viewBox="0 0 24 24">
								<path fill="currentColor" d="m15.914 17.5l-5.5-5.5l5.5-5.5L14.5 5.086L7.586 12l6.914 6.914z"></path>
							</svg>
						</Link>
					</Links>
				</div>
				<BlogProvider value={{ config, opts: pageOpts }}>
					<MDXProvider components={{ ...components, ...config.components }}>
						<article
							className="_container _prose max-md:_prose-sm _pt-6 dark:_prose-invert _relative _overflow-hidden"
							dir="ltr"
							style={{ fontSize: "18px", lineHeight: "normal" }}
						>
							<div className="_flex _justify _z-10 _pb-10 _justify-center">
								<div
									className="_text-center _p-4 _text-4xl _font-bold _bg-clip-text _text-transparent"
									style={{
										backgroundImage: "linear-gradient(90deg, rgba(0,124,240,1) 23%, rgba(0,223,216,1) 71%)",
									}}
								>
									Samuel Scheit
								</div>
							</div>
							<HeadingContext.Provider value={ref}>
								{pageOpts.hasJsxInH1 ? <h1 ref={ref} /> : null}
								{pageOpts.hasJsxInH1 ? null : <h1 style={{}}>{pageTitle}</h1>}
								<div className="_flex _flex-row _w-full _text-xs _text-center _gap-6 _items-center">
									{date && (
										<time className=" _font-mono " dateTime={date.toISOString()}>
											{date.toLocaleDateString("en-US", {
												dateStyle: "long",
											})}
										</time>
									)}
									{tags.length > 0 && (
										<div className="_flex _justify-center _gap-2 _items-center">
											{tags.map((tag) => (
												<div key={tag} className="_text-sm _bg-gray-50 dark:_bg-gray-900 _p-2 _rounded-md">
													{tag}
												</div>
											))}
										</div>
									)}
								</div>

								<MDXProvider components={{ ...components, ...config.components }}>{children}</MDXProvider>
							</HeadingContext.Provider>
							<footer className="_mt-20 _mb-40 _text-center _flex _flex-col _gap-2">
								<div className="_text-2xl _font-semibold _mb-4">Thank you for reading!</div>
								<div>
									If you want to support me you can sponsor me on{" "}
									<ExternalLink
										style={{ textDecoration: "none", fontWeight: 600 }}
										href="https://github.com/sponsors/SamuelScheit"
									>
										GitHub
									</ExternalLink>{" "}
									💚
								</div>
								<div>If you have any questions or feedback, feel free to contact me. 👨‍💻</div>
								<div className="contact-links links-wrapper _mt-20">
									<Links />
								</div>
							</footer>
						</article>
					</MDXProvider>
				</BlogProvider>
				<div className="links-wrapper" style={{ width: "100px" }}></div>
			</div>
		</>
	);
}
