import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
	prefix: "_",
	content: [
		"./pages/**/*.tsx",
		"./components/**/*.tsx",
		"./node_modules/nextra/dist/client/icons/*.js",
		"./node_modules/nextra/dist/client/components/**/*.js",
	],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: "#000",
			white: "#fff",
			gray: colors.gray,
			slate: colors.slate,
			neutral: colors.neutral,
			red: colors.red,
			orange: colors.orange,
			blue: colors.blue,
			yellow: colors.yellow,
			primary: colors.blue,
		},
	},
	plugins: [typography],
	// darkMode: ["media"],
} satisfies Config;
