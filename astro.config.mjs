import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components"; /* Render the custom directive content */
import rehypeKatex from "rehype-katex";
import katex from "katex";
import "katex/dist/contrib/mhchem.mjs"; // Load mhchem extension
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive"; /* Handle directives */
import remarkMath from "remark-math";
import rehypeCallouts from "rehype-callouts";
import remarkSectionize from "remark-sectionize";
import { expressiveCodeConfig, siteConfig } from "./src/config";
import { i18n } from "./src/i18n/translation";
import I18nKey from "./src/i18n/i18nKey";
import { pluginLanguageBadge } from "expressive-code-language-badge"; /* Language Badge */
import { pluginCollapsible } from "expressive-code-collapsible"; /* Collapsible */
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { rehypeMermaid } from "./src/plugins/rehype-mermaid.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkMermaid } from "./src/plugins/remark-mermaid.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import mdx from "@astrojs/mdx";
import rehypeEmailProtection from "./src/plugins/rehype-email-protection.mjs";
import rehypeExternalLinks from "./src/plugins/rehype-external-links.mjs";
import rehypeFigure from "./src/plugins/rehype-figure.mjs";
import { remarkImageGrid } from "./src/plugins/remark-image-grid.js";

// https://astro.build/config
export default defineConfig({
	site: siteConfig.site_url,

	base: "/",
	trailingSlash: "always",

	// Image optimization configuration
	image: {
		// Global responsive layout
		layout: "constrained",
	},

	experimental: {
		// Rust compiler to improve build performance (experimental). May cause build failure on some platforms, enable/disable as needed.
		rustCompiler: false, 
		// Queued rendering for performance optimization (experimental)
		queuedRendering: { enabled: true }, 
	},

	integrations: [
		swup({
			theme: false,
			animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
			// the default value `transition-` cause transition delay
			// when the Tailwind class `transition-all` is used
			containers: [
				"#banner-overlay-container",
				"#banner-dim-container",
				"#swup-container",
				"#left-sidebar-dynamic",
				"#right-sidebar-dynamic",
				"#floating-toc-wrapper",
			],
			smoothScrolling: false,
			cache: true,
			preload: true,
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true,
			// Scroll configuration optimization
			resolveUrl: (url) => url,
			animateHistoryBrowsing: false,
			skipPopStateHandling: (event) => {
				// Skip anchor links, let the browser handle them naturally
				return event.state && event.state.url && event.state.url.includes("#");
			},
		}),
		icon({
			include: {
				"material-symbols": ["*"],
				"fa7-brands": ["*"],
				"fa7-regular": ["*"],
				"fa7-solid": ["*"],
				"simple-icons": ["*"],
				mdi: ["*"],
			},
		}),
		expressiveCode({
			themes: [expressiveCodeConfig.darkTheme, expressiveCodeConfig.lightTheme],
			useDarkModeMediaQuery: false,
			themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
			plugins: [
				// pluginLanguageBadge config - read settings from expressiveCodeConfig
				...(expressiveCodeConfig.pluginLanguageBadge?.enable === true
					? [pluginLanguageBadge()]
					: []),
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				// pluginCollapsible config - read settings from expressiveCodeConfig, use i18n text
				...(expressiveCodeConfig.pluginCollapsible?.enable === true
					? [
							pluginCollapsible({
								lineThreshold:
									expressiveCodeConfig.pluginCollapsible.lineThreshold || 15,
								previewLines:
									expressiveCodeConfig.pluginCollapsible.previewLines || 8,
								defaultCollapsed:
									expressiveCodeConfig.pluginCollapsible.defaultCollapsed ??
									true,
								expandButtonText: i18n(I18nKey.codeCollapsibleShowMore),
								collapseButtonText: i18n(I18nKey.codeCollapsibleShowLess),
								expandedAnnouncement: i18n(I18nKey.codeCollapsibleExpanded),
								collapsedAnnouncement: i18n(I18nKey.codeCollapsibleCollapsed),
							}),
						]
					: []),
			],
			defaultProps: {
				wrap: false,
				overridesByLang: {
					shellsession: {
						showLineNumbers: false,
					},
				},
			},
			styleOverrides: {
				borderRadius: "0.75rem",
				codeFontSize: "0.875rem",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				codeLineHeight: "1.5rem",
				frames: {},
				textMarkers: {
					delHue: 0,
					insHue: 180,
					markHue: 250,
				},
				languageBadge: {
					fontSize: "0.75rem",
					fontWeight: "bold",
					borderRadius: "0.25rem",
					opacity: "1",
					borderWidth: "0px",
					borderColor: "transparent",
				},
			},
			frames: {
				showCopyToClipboardButton: true,
			},
		}),
		svelte(),
		sitemap({
			filter: (page) => {
				// Filter sitemap based on page configuration
				const url = new URL(page);
				const pathname = url.pathname;

				if (pathname === "/friends/" && !siteConfig.pages.friends) {
					return false;
				}
				if (pathname === "/sponsor/" && !siteConfig.pages.sponsor) {
					return false;
				}
				if (pathname === "/guestbook/" && !siteConfig.pages.guestbook) {
					return false;
				}
				if (pathname === "/bangumi/" && !siteConfig.pages.bangumi) {
					return false;
				}
				if (pathname === "/gallery/" && !siteConfig.pages.gallery) {
					return false;
				}

				return true;
			},
		}),
		mdx(),
	],
	markdown: {
		remarkPlugins: [
			remarkMath,
			remarkReadingTime,
			remarkImageGrid,
			remarkExcerpt,
			remarkDirective,
			remarkSectionize,
			parseDirectiveNode,
			remarkMermaid,
		],
		rehypePlugins: [
			[rehypeKatex, { katex }],
			[rehypeCallouts, { theme: siteConfig.rehypeCallouts.theme }],
			rehypeSlug,
			rehypeMermaid,
			rehypeFigure,
			[rehypeExternalLinks, { siteUrl: siteConfig.site_url }],
			[rehypeEmailProtection, { method: "base64" }], // Email protection plugin, supports 'base64' or 'rot13'
			[
				rehypeComponents,
				{
					components: {
						github: GithubCardComponent,
					},
				},
			],
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
						properties: {
							className: ["anchor-icon"],
							"data-pagefind-ignore": true,
						},
						children: [
							{
								type: "text",
								value: "#",
							},
						],
					},
				},
			],
		],
	},
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
				// Remove console.log and debugger
				drop: ["console", "debugger"], 
			},
			rollupOptions: {
				onwarn(warning, warn) {
					// temporarily suppress this warning
					if (
						warning.message.includes("is dynamically imported by") &&
						warning.message.includes("but also statically imported by")
					) {
						return;
					}
					warn(warning);
				},
			},
			// CSS optimization
			cssCodeSplit: true,
			cssMinify: "esbuild",
		},
	},
});
