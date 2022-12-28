import Image from "next/image";
import { Timeline, TimelineItem } from "./timeline";
import Lego from "../public/lego.jpeg";

export function About() {
	return (
		<div id="about">
			<h2
				style={{
					background: "var(--background)",
					flex: 1,
					zIndex: 1,
					position: "relative",
					textAlign: "center",
					paddingBottom: "3rem",
					paddingTop: "10rem",
					fontSize: "4rem",
				}}
			>
				About
			</h2>
			<Timeline>
				<TimelineItem style={{ paddingTop: "2rem" }} date="November 2003" title="">
					<div>
						Samuel Scheit was born in November 2003 in Munich, Germany. <br />
						<br />
						His father grew up in Konstanz, Germany, studied technical computer science, while his grandfather studied
						electrical engineering. <br />
						<br />
						Since both his father and grandfather worked in computer engineering, both had an interest in introducing their
						(grand)son to technology at an early age.
					</div>
				</TimelineItem>
				<TimelineItem date="October 2013" title="Lego Mindstorms">
					<Image
						style={{
							borderRadius: 10,
							float: "left",
							marginRight: "1rem",
							maxWidth: "40%",
							height: "auto",
						}}
						priority
						width={250}
						src={Lego}
						alt="Lego"
					/>
					<div>
						At the age of 10, Samuel was introduced to robotics through the construction and visual programming of a Lego
						Mindstorms robot, which sparked a passion for building projects.
						<br />
						<br />
						He enjoyed the sense of accomplishment he gained from this activity and was eager to learn more.
					</div>
				</TimelineItem>
				<TimelineItem date="August 2014" title="Learning programming">
					<div>
						In addition to building with Lego, Samuel enjoyed playing video games, like many other children his age. However, he
						had to share the family computer with his{" "}
						<a className="hover-animation" rel="noreferrer" target="_blank" href="https://linktr.ee/GxdAim">
							brother
						</a>{" "}
						and parents. <br />
						<br />
						As a result, he asked his (grand)parents for a own computer and after negotiating they agreed to purchase one for
						him, if he learned programming first. <br />
						<br />
						Samuel learned the{" "}
						<a className="hover-animation" rel="noreferrer" target="_blank" href="https://www.c-howto.de/">
							C
						</a>{" "}
						programming language because it was the only language they could help him with. He used it to program a Sudoku
						solver, which he then used to help his grandfather solve sudokus in the newspaper.
					</div>
				</TimelineItem>
				<TimelineItem date="November 2015" title="A personal computer">
					<div>
						As promised, he received his first personal computer, which he of course used for <del>programming</del> playing
						Minecraft. <br />
						<br />
						Within the game, he preferred playing in creative mode, where he was able to create complex structures similar to
						logic gates using &quot;command blocks and redstone&quot;. <br />
						<br />
						However, playing alone was not as enjoyable as playing with friends, so he learned how to host servers for them.
					</div>
				</TimelineItem>
				<TimelineItem date="June 2016" title="Linux">
					<div>
						Samuel wanted to host multiple Minecraft servers and needed to find a way to keep them running without constantly
						relying on his personal computer. <br />
						<br />
						He used an old laptop from his parents&apos; work and installed Linux, as it was much more efficient and able host
						multiple servers at the same time. <br />
						Through this process, he gained knowledge about operating systems and became proficient in using the command line
						efficiently. <br />
						<br />
						However, he encountered a problem with managing multiple servers, as he did not have an overview of them.
					</div>
				</TimelineItem>
				<TimelineItem date="February 2017" title="Web development">
					<div>
						Samuel wanted to create a website that provided an overview of his Minecraft servers, so he had to learn HTML and
						CSS. <br />
						<br />
						However, a static website just for viewing was not enough, he also wanted to manage those servers. <br />
						For this, he learned PHP and SQL in order to make the site interactive and store the servers in a database.
						<br />
						<br />
						<a
							className="hover-animation"
							rel="noreferrer"
							target="_blank"
							href="https://github.com/SamuelScheit/minecraft-server-admin-panel"
						>
							This project
						</a>{" "}
						marked the beginning of his journey as a developer and the start of many subsequent projects.
					</div>
				</TimelineItem>
			</Timeline>
		</div>
	);
}
