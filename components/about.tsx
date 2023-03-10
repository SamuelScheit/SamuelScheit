import Image from "next/image";
import { Timeline, TimelineItem } from "./timeline";
import Lego from "../public/lego.jpeg";
import { Link } from "./Link";

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
				<TimelineItem date="August 2014" title="Learning programming">
					<div>
						Samuel enjoyed playing video games, like many other children his age. However, he had to share the family computer
						with his <Link href="https://linktr.ee/GxdAim">brother</Link> and parents. <br />
						<br />
						As a result, he asked his (grand)parents for an own computer and after negotiating they agreed to purchase one for
						him, if he learned programming first. <br />
						<br />
						Samuel learned the <Link href="https://www.c-howto.de/">C</Link> programming language because it was the only one
						they could help him with. He used it to program a Sudoku solver, which he then used to help his grandfather solve
						Sudoku in the newspaper.
					</div>
				</TimelineItem>
				<TimelineItem date="November 2015" title="A personal computer">
					<div>
						As promised, he received his first personal computer, which he of course used for <del>programming</del> playing
						Minecraft. <br />
						<br />
						Within the game he build complex structures similar to logic gates using &quot;command blocks and redstone&quot;.{" "}
						<br />
						<br />
						However, playing alone was not as enjoyable as playing with friends, so he learned how to host servers for them.
					</div>
				</TimelineItem>
				<TimelineItem date="June 2016" title="Linux">
					<div>
						Samuel wanted to host multiple Minecraft servers and needed to find a way to keep them running without constantly
						relying on his personal computer. <br />
						<br />
						He used an old laptop from his parents&apos; work and installed Linux, as it was much more efficient and able to
						host multiple servers at the same time. <br />
						Through this process, he gained knowledge about operating systems and hosting servers.
						<br />
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
						This project marked the beginning of his journey as a developer and the start of many{" "}
						<a className="hover-animation" href="#projects">
							subsequent projects
						</a>
						.
					</div>
				</TimelineItem>
				<TimelineItem date="September 2018" title="School">
					<div>
						Because Samuel was part of a tablet class, he and his classmates wanted to exchange ideas and collaborate on their
						tablets.
						<br />
						<br />
						However, since there was no existing{" "}
						<Link href={"https://github.com/SamuelScheit/Tabletklasse"}>communication platform</Link> provided by the school, he
						developed one by himself for his classmates to communicate and work together on projects.
						<br />
						<br />
						As Samuel continued, he pivoted his project to a mobile{" "}
						<Link href="https://apps.apple.com/de/app/gyki/id1449048723?platform=iphone">app</Link> for his school, which
						allowed students to view the substitution plan, timetable, and appointments in one easy-to-use interface.
					</div>
				</TimelineItem>
				<TimelineItem date="March 2019" title="Discord">
					<div>
						Alongside his school platform, Samuel used Discord for private communication and wanted to extend the platform.
						<br />
						<br />
						He started programming various <Link href="https://github.com/SamuelScheit/discord-bots">Discord bots</Link> and
						gained experience doing commissioned work.
						<br />
						<br />
						To make it easier to oversee his bots, he needed a user-friendly interface and developed a tool called{" "}
						<Link href="https://github.com/SamuelScheit/discord-bot-client">Discord Bot Client</Link>.
						<br />
						<br />
						But as it made use of Discord&apos;s official client, Discord shut it down alongside his account and all of his
						bots.
					</div>
				</TimelineItem>
				<TimelineItem date="January 2021" title="Fosscord">
					<div>
						Samuel wanted to create an alternative platform to Discord that is free, open-source and can be self-hosted.
						<br />
						<br />
						However, he still wanted to be able to communicate with his friends and use the bots he had made prior.
						<br />
						<br />
						That is why he founded <Link href="https://fosscord.com/">Fosscord</Link>, a platform that is backwards compatible
						with Discord and that enables users to have control over their conversations while still being able to use Discord
						clients, bots, and libraries.
					</div>
				</TimelineItem>
				<TimelineItem date="January 2022" title="Trant">
					<div>
						For Fosscord, Samuel wanted to create an independent client that could be used to connect to both Discord and
						Fosscord.
						<br />
						<br />
						However, he realized that he could further extend the project and create a client that is not only limited to
						Discord/Fosscord.
						<br />
						<br />
						That is why he founded <Link href="https://trant.app/">Trant</Link>, a messenger that allows users to reach their
						friends no matter what platform they use e.g. WhatsApp, Telegram, Discord/Fosscord.
					</div>
				</TimelineItem>
			</Timeline>
		</div>
	);
}
