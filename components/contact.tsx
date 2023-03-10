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
				<input type="checkbox" name="botcheck" id="" style={{ display: "none" }} />
				<input type="submit" id="submit" value="Send" />
			</form>
		</section>
	);
}
