import "../styles/globals.scss";
import "../components/footer.scss";
import "../components/about.scss";
import "../components/hero.scss";
import "../components/contact.scss";
import "../components/projects.scss";
import "../components/timeline.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
