import { Html, Head, Main, NextScript } from "next/document";
import { glowCards } from "../components/projects";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<meta property="og:image" content="/media.png" />
				<meta name="og:description" content="Samuel Scheit - Developer, Student, Founder" />
				<meta property="og:locale" content="en_GB" />
				<link rel="preload" crossOrigin="anonymous" type="font/woff2" as="font" href="/fonts/inter-v12-latin-900.woff2" />
				<link rel="preload" crossOrigin="anonymous" type="font/woff2" as="font" href="/fonts/inter-v12-latin-600.woff2" />
				<link rel="preload" crossOrigin="anonymous" type="font/woff2" as="font" href="/fonts/inter-v12-latin-regular.woff2" />
			</Head>
			<body>
				<Main />
				<NextScript />
				<script
					async
					defer
					dangerouslySetInnerHTML={{
						__html: `${glowCards.toString()}; window.addEventListener("DOMContentLoaded", glowCards);`,
					}}
				/>
			</body>
		</Html>
	);
}
