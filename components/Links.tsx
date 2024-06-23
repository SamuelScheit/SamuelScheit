import GitHub from "../public/github.svg";
import Twitter from "../public/twitter.svg";
import LinkedIn from "../public/linkedin.svg";
import Telegram from "../public/telegram.svg";
import Email from "../public/email.svg";

export function Links() {
	return (
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
			<a title="contact@samuelscheit.com" className="email" href="mailto:contact@samuelscheit.com" target="_blank" rel="noreferrer">
				<Email />
			</a>
		</div>
	);
}
