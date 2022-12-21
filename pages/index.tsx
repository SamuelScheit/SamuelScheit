import { Hero } from "../components/hero";
import { Navbar } from "../components/navbar";

export default function Home() {
	return (
		<div className={"Home"}>
			<header>
				<Navbar />
			</header>
			<main>
				<Hero />
				<section style={{ height: "100vh" }} />
			</main>
		</div>
	);
}
