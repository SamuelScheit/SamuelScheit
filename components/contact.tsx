import { Links } from "./Links";

export function Contact() {
	return (
		<section id="contact">
			<h2 style={{ fontSize: "4rem" }}>Contact</h2>
			<form action="https://api.web3forms.com/submit" method="POST" className="form" id="form">
				<input type="hidden" name="access_key" value="f4918352-8aef-4b1a-a057-cf721221cc15" />
				<div className="form-group" id="name">
					<label htmlFor="name">Your Name</label>
					<input name="from_name" required type="text" id="name" />
				</div>
				<div className="form-group" id="email">
					<label htmlFor="email">Your Email</label>
					<input name="replyto" required type="email" id="email" />
				</div>
				<div className="form-group" id="message">
					<label htmlFor="message">Message</label>
					<textarea name="message" required id="message" />
				</div>
				<div className="form-group" id="note">
					By submitting this form you agree to the{" "}
					<a target="_blank" rel="noreferrer" href="https://web3forms.com/privacy">
						privacy policy
					</a>
					.
				</div>
				<input type="submit" id="submit" value="Send" />
				<input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
			</form>

			<div className="contact-links links-wrapper">
				<Links />
			</div>
		</section>
	);
}
