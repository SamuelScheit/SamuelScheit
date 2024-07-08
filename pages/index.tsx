import Head from "next/head";
import { About } from "../components/about";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";
import { Contact } from "../components/contact";
import { Links } from "../components/Links";

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
					<Links />
				</div>
				<div className="content">
					<Hero />
					<Projects />
					<About />
					<Contact />
				</div>
				<div className="links-wrapper" style={{ width: "100px" }}></div>
			</div>
		</>
	);
}
