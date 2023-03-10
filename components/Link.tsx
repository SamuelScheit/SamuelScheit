export function Link(props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
	return <a className="hover-animation" target="_blank" rel="noreferrer" {...props} />;
}
