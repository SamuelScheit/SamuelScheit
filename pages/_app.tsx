import "./about.scss";
import "../styles/globals.scss";
import "../components/hero.scss";
import "../components/navbar.scss";
import "../components/timeline.scss";
import type { AppProps } from "next/app";

import { Inter } from "@next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], weight: ["900", "600", "400"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width; initial-scale=1.0" />
			</Head>
			<style jsx global>{`
				html {
					font-family: ${inter.style.fontFamily};
					// font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
				}
			`}</style>
			<Component {...pageProps} />
		</>
	);
}
