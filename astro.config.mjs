import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import swup from "@swup/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCallouts from "rehype-callouts";
import rehypeComponents from "rehype-components";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import githubCardRenderer from "./src/plugins/rehype-component-github-card.mjs";
import { mermaid as rehypeMermaid } from "./src/plugins/rehype-mermaid.mjs";
import { remarkDirectiveRehype } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { mermaid as remarkMermaid } from "./src/plugins/remark-mermaid.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import { siteConfig } from "./src/config";

// https://astro.build/config
export default defineConfig({
	site: siteConfig.site_url,
	base: "/",
	trailingSlash: "always",

	adapter: cloudflare({
		imageService: "cloudflare",
		platformProxy: {
			enabled: true,
		},
		nodejsCompat: true,
		prerender: false,
	}),

	output: "server",

	image: {
		layout: "constrained",
	},

	experimental: {
		rustCompiler: false,
		queuedRendering: { enabled: false },
	},

	integrations: [
		svelte(),
		swup({
			theme: false,
			animationClass: "transition-",
			containers: ["main"],
			smoothScrolling: true,
			cache: true,
			preload: true,
			accessibility: true,
			updateHead: true,
			updateBodyClass: true,
			globalInstance: true,
		}),
		icon({
			include: {
				"material-symbols": ["*"],
				fa6_brands: ["*"],
				fa6_regular: ["*"],
				fa6_solid: ["*"],
			},
		}),
		// sitemap(),
	],

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@rehype-callouts-theme": `rehype-callouts/theme/${siteConfig.rehypeCallouts.theme}`,
			},
		},
		build: {
			minify: "esbuild",
			esbuildOptions: {
				minify: true,
				drop: ["console", "debugger"],
			},
		},
		ssr: {
			noExternal: ["react-tweet"],
		},
	},

	markdown: {
		remarkPlugins: [
			remarkDirective,
			remarkDirectiveRehype,
			remarkExcerpt,
			remarkReadingTime,
			remarkMermaid,
		],
		rehypePlugins: [
			rehypeKatex,
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["anchor"],
					},
					content: {
						type: "element",
						tagName: "span",
						properties: { className: ["anchor-icon"] },
						children: [{ type: "text", value: "#" }],
					},
				},
			],
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					rel: ["nofollow", "noopener", "noreferrer"],
				},
			],
			[
				rehypeCallouts,
				{
					theme: "vite",
				},
			],
			[
				rehypeComponents,
				{
					components: {
						github: githubCardRenderer,
					},
				},
			],
			rehypeMermaid,
		],
	},
});
