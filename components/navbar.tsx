import Link from "next/link";

export function Navbar() {
	return (
		<nav className="navbar">
			<div className="wrapper">
				<div>
					<Link href="/">•</Link>
				</div>
				<div>
					<Link href="/about">About</Link>
				</div>
			</div>
		</nav>
	);
}
