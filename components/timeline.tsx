export function Timeline(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<section style={{ zIndex: 0 }} {...props} className="timeline">
			<div className="bar">
				<div className="overlay-fade-top" />
				<div className="track"></div>
				<div className="overlay-fade-bottom" />
			</div>
			{props.children}
		</section>
	);
}

export function TimelineItem(
	props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		date?: string | Date;
		title?: string;
		text?: string;
	}
) {
	return (
		<div {...props} className="item">
			<div className="date">{props.date instanceof Date ? props.date.toDateString() : props.date}</div>
			<div className="dot" />
			<div className="content">
				<h1>{props.title}</h1>
				{props.text?.split("\n").map((x) => (
					<p key={x}>
						{x}
						<br />
					</p>
				)) || props.children}
			</div>
		</div>
	);
}
