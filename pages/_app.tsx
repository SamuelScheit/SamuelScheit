import "./about.scss";
import "../styles/globals.scss";
import "../components/hero.scss";
import "../components/navbar.scss";
import "../components/timeline.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
