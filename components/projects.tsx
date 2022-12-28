import { ReactNode, useState, useRef } from "react";
import Image from "next/image";
import Fosscord from "../public/fosscord.png";
import DiscordBotClient from "../public/discord_bot_client.png";
import Trenite from "../public/trenite.png";
import CarcassonneAI from "../public/carcassonne_ai.png";
import PuppeteerStream from "../public/puppeteer_stream.png";

export function Card(props: { href?: string; children: ReactNode }) {
	return (
		<a rel="noreferrer" target="_blank" href={props.href} className="card">
			<div className="glow" />
			{props.children}
		</a>
	);
}

export function Projects() {
	return (
		<section className="projects" id="projects">
			<h2
				style={{
					fontSize: "4rem",
					fontWeight: 700,
					textAlign: "center",
					marginTop: "4rem",
					marginBottom: "4rem",
				}}
			>
				Projects
			</h2>

			<div className="list">
				<Card href="https://fosscord.com">
					<Image style={{ aspectRatio: "2 / 1" }} src={Fosscord} alt="Fosscord" />
				</Card>
				<Card href="https://github.com/SamuelScheit/discord-bot-client">
					<Image style={{ aspectRatio: "2 / 1" }} src={DiscordBotClient} alt="Discord Bot Client" />
				</Card>
				<Card href="https://github.com/Trenite/Trenite">
					<Image style={{ aspectRatio: "2 / 1" }} src={Trenite} alt="Trenite Discord Bot" />
				</Card>
				<Card href="https://github.com/SamuelScheit/puppeteer-stream">
					<Image style={{ aspectRatio: "2 / 1" }} src={PuppeteerStream} alt="Puppeteer stream" />
				</Card>
				<Card href="https://github.com/SamuelScheit/carcassonne-ai">
					<Image style={{ aspectRatio: "2 / 1" }} src={CarcassonneAI} alt="Carcassonne AI" />
				</Card>
			</div>
		</section>
	);
}
