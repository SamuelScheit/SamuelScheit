import Head from "next/head";
import { About } from "../components/about";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";
import { Contact } from "../components/contact";

import GitHub from "../public/github.svg";
import Twitter from "../public/twitter.svg";
import LinkedIn from "../public/linkedin.svg";
import Telegram from "../public/telegram.svg";

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
				<div className="links-wrapper">
					<div className="links">
						<a title="GitHub" href="https://github.com/SamuelScheit/" target="_blank" rel="noreferrer">
							<GitHub />
						</a>
						<a
							title="LinkedIn"
							className="linkedin"
							href="https://www.linkedin.com/in/samuel-scheit-343436247/"
							target="_blank"
							rel="noreferrer"
						>
							<LinkedIn />
						</a>
						<a title="Twitter" className="twitter" href="https://twitter.com/SamuelScheit" target="_blank" rel="noreferrer">
							<Twitter />
						</a>
						<a title="Telegram" className="telegram" href="https://t.me/SamuelScheit" target="_blank" rel="noreferrer">
							<Telegram />
						</a>
					</div>
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
