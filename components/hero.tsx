import Avatar from "../public/avatar.png";
import GitHub from "../public/github.svg";
import Twitter from "../public/twitter.svg";
import LinkedIn from "../public/linkedin.svg";
import Image from "next/image";
import { ReactNode } from "react";

function RepeatFirstElement(
	props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		children: React.ReactNode[];
	}
) {
	return (
		<div {...props}>
			{props.children}
			{props.children[0]}
		</div>
	);
}

export function Hero(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<section {...props} className="hero">
			<div className="grid">
				<div className="title">
					<h1>Samuel Scheit</h1>
					<div className="subtitle">
						<RepeatFirstElement className="wrapper">
							<h2
								style={{
									backgroundImage: "linear-gradient(90deg, #007CF0, #00DFD8)",
								}}
							>
								Developer
							</h2>
							<h2
								style={{
									backgroundImage: "linear-gradient(90deg, #7928CA, #FF0080)",
								}}
							>
								Student
							</h2>
							<h2
								style={{
									backgroundImage: "linear-gradient(90deg, #FF4D4D, #F9CB28)",
								}}
							>
								Founder
							</h2>
						</RepeatFirstElement>
					</div>
				</div>
				<div className="avatar">
					<Image priority width={250} src={Avatar} alt="Samuel Scheit" />
				</div>
			</div>
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
		</section>
	);
}
