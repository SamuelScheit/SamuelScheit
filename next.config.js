const withExportImages = require("next-export-optimize-images");
const { default: nextra } = require("nextra");

const withNextra = nextra({
	theme: "nextra-theme-blog",
	themeConfig: "./theme.config.jsx",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: { unoptimized: false },
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};

module.exports = withNextra(withExportImages(nextConfig));
