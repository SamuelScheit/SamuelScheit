import "./about.scss";
import "../styles/globals.scss";
import "../components/hero.scss";
import "../components/timeline.scss";
import type { AppProps } from "next/app";

import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
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
