import Head from "next/head";
import { About } from "../components/about";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";
import { Contact } from "../components/contact";

import GitHub from "../public/github.svg";
import Twitter from "../public/twitter.svg";
import LinkedIn from "../public/linkedin.svg";

export const config = {
	unstable_runtimeJS: false,
};

export default function Home() {
	return (
		<>
			<Head>
				<title>Samuel Scheit</title>
				<meta name="description" content="Samuel Scheit - Developer, Student, Founder" />
			</Head>
			<div className="main">
				<div className="links">
					<a href="https://github.com/SamuelScheit/" target="_blank" rel="noreferrer">
						<GitHub />
					</a>
					<a className="linkedin" href="https://www.linkedin.com/in/samuel-scheit-343436247/" target="_blank" rel="noreferrer">
						<LinkedIn />
					</a>
					<a className="twitter" href="https://twitter.com/SamuelScheit" target="_blank" rel="noreferrer">
						<Twitter />
					</a>
				</div>
				<div className="content">
					<Hero />
					<Projects />
					<About />
					<Contact />
				</div>
				<div className="mail"></div>
			</div>
		</>
	);
}
