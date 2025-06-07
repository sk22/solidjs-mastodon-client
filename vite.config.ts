/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import path from "node:path";
import solidPlugin from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
	plugins: [solidPlugin(), solidSvg()],
	server: {
		port: 3000,
	},
	test: {
		environment: "jsdom",
		globals: false,
		setupFiles: ["node_modules/@testing-library/jest-dom/vitest"],
		// if you have few tests, try commenting this
		// out to improve performance:
		isolate: false,
	},
	build: {
		target: "esnext",
	},
	resolve: {
		conditions: ["development", "browser"],
		alias: {
			"~": path.join(process.cwd(), "./src"),
		},
	},
	css: {
		modules: {
			localsConvention: "camelCase",
		},
	},
});
