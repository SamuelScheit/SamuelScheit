import Head from "next/head";
import { About } from "../components/about";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";

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
			<header></header>
			<main style={{ paddingBottom: "5rem" }}>
				<Hero />
				<About />
				<Projects />
			</main>
			<footer></footer>
		</>
	);
}
