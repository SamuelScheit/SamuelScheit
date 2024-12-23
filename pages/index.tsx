import Head from "next/head";
import { About } from "../components/about";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";
import { Contact } from "../components/contact";
import { Links } from "../components/Links";
import { BlogPosts } from "../components/blog";

export default function Home(props: any) {
	return (
		<>
			<Head>
				<title>Samuel Scheit</title>
				<meta name="description" content="Samuel Scheit - Developer, Student, Founder" />
				<meta name="og:description" content="Samuel Scheit - Developer, Student, Founder" />
				<link rel="preload" crossOrigin="anonymous" type="font/woff2" as="font" href="/fonts/inter-v12-latin-900.woff2" />
				<link rel="preload" crossOrigin="anonymous" type="font/woff2" as="font" href="/fonts/inter-v12-latin-600.woff2" />
				<link rel="preload" crossOrigin="anonymous" type="font/woff2" as="font" href="/fonts/inter-v12-latin-regular.woff2" />
			</Head>
			<div className="main">
				<div className="links-wrapper">
					<Links />
				</div>
				<div className="content">
					<Hero />
					<BlogPosts />
					<Projects />
					<About />
					<Contact />
				</div>
				<div className="links-wrapper" style={{ width: "100px" }}></div>
				<div className="honeypot" style={{ display: "none" }}>
					<a href="mailto:bluestacksplayer380@icloud.com">bluestacksplayer380@icloud.com</a>
					<a href="mailto:bluestacksplayer380@gmail.com">bluestacksplayer380@gmail.com</a>
				</div>
			</div>
		</>
	);
}
