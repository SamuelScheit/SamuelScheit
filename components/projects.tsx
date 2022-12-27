import Image from "next/image";
import Fosscord from "../public/fosscord.png";
import DiscordBotClient from "../public/discord_bot_client.png";
import Trenite from "../public/trenite.png";
import CarcassonneAI from "../public/carcassonne_ai.png";

export function Projects() {
	return (
		<section className="projects">
			<h2
				style={{
					fontSize: "3rem",
					fontWeight: 700,
					textAlign: "center",
					marginTop: "4rem",
					marginBottom: "4rem",
				}}
			>
				Projects
			</h2>

			<div className="list">
				<a rel="noreferrer" target="_blank" href="https://fosscord.com" className="card">
					<Image style={{ aspectRatio: "2 / 1" }} src={Fosscord} alt="Fosscord" />
				</a>

				<a rel="noreferrer" target="_blank" href="https://github.com/SamuelScheit/discord-bot-client" className="card">
					<Image style={{ aspectRatio: "2 / 1" }} src={DiscordBotClient} alt="Discord Bot Client" />
				</a>

				<a rel="noreferrer" target="_blank" href="https://github.com/Trenite/Trenite" className="card">
					<Image style={{ aspectRatio: "2 / 1" }} src={Trenite} alt="Trenite Discord Bot" />
				</a>

				<a rel="noreferrer" target="_blank" href="https://github.com/SamuelScheit/carcassonne-ai" className="card">
					<Image style={{ aspectRatio: "2 / 1" }} src={CarcassonneAI} alt="Carcassonne AI" />
				</a>
			</div>
		</section>
	);
}
