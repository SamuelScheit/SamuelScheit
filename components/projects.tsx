import { ReactNode, useState, useRef } from "react";
import Image from "next/image";
import Spacebar from "../public/spacebar.png";
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
					<Image style={{ aspectRatio: "2 / 1" }} src={Spacebar} alt="Spacebar" />
				</Card>
				<Card href="https://github.com/SamuelScheit/discord-bot-client">
					<Image style={{ aspectRatio: "2 / 1" }} src={DiscordBotClient} alt="Discord Bot Client" />
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

export function glowCards() {
	const cards = document.querySelectorAll(".projects .card") as any;
	let bounds: any;

	function rotateToMouse(this: any, e: any) {
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		const leftX = mouseX - bounds.x;
		const topY = mouseY - bounds.y;
		const center = {
			x: leftX - bounds.width / 2,
			y: topY - bounds.height / 2,
		};

		this.querySelector(".glow").style.backgroundImage = `
		radial-gradient(
		circle at
		${center.x * 2 + bounds.width / 2}px
		${center.y * 2 + bounds.height / 2}px,
		#ffffff55,
		#0000000f
		)`;
	}

	for (const $card of cards) {
		const rotate = rotateToMouse.bind($card);

		$card.addEventListener("mouseenter", () => {
			bounds = $card.getBoundingClientRect();
			document.addEventListener("mousemove", rotate);
		});

		$card.addEventListener("mouseleave", () => {
			document.removeEventListener("mousemove", rotate);
		});
	}
}
