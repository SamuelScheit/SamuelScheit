import withExportImages from "next-export-optimize-images";
import nextra from "nextra";

const withNextra = nextra({
	// theme: "nextra-theme-blog",
	// theme: "nextra-theme-blog",
	// themeConfig: "./theme.config.jsx",
	theme: "./components/blog/theme.tsx",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: false,
	},
	experimental: {
		scrollRestoration: true,
		parallelServerCompiles: true,
		webpackBuildWorker: true,
		parallelServerBuildTraces: true,
		staticGenerationRetryCount: 0,
		staticGenerationMaxConcurrency: 20,
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		});

		const nextExportImageLoader = config.module.rules.find(
			({ use }) => use && use.length > 0 && use[0]?.loader === "next-export-optimize-images-loader"
		);
		if (nextExportImageLoader) {
			nextExportImageLoader.test = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i; // Removed only svg
		}

		return config;
	},
	output: "export",
};

export default withExportImages(withNextra(nextConfig));
// export default withExportImages(nextConfig);
