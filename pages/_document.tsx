import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<meta property="og:image" content="/media.png" />
				<meta property="og:locale" content="en_GB" />
				<link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.xml" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
