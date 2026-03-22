import type { CommentConfig } from "../types/config";

export const commentConfig: CommentConfig = {
	// Comment system type: none, twikoo, waline, giscus, disqus, artalk. Default is none (disabled).
	type: "none",

	// Twikoo comment system configuration
	twikoo: {
		envId: "https://twikoo.vercel.app",
		// Set Twikoo language
		lang: "en",
		// Whether to enable post visitor count statistics
		visitorCount: true,
	},

	// Waline comment system configuration
	waline: {
		// Waline backend service address
		serverURL: "https://waline.vercel.app",
		// Set Waline language
		lang: "en",
		// Set Waline emoji URLs
		emoji: [
			"https://unpkg.com/@waline/emojis@1.4.0/weibo",
			"https://unpkg.com/@waline/emojis@1.4.0/bilibili",
			"https://unpkg.com/@waline/emojis@1.4.0/bmoji",
		],
		// Comment login mode:
		// 'enable'  -- Default, allows guest comments and 3rd-party OAuth login.
		// 'force'   -- Login required to comment, suitable for strict communities.
		// 'disable' -- Login and OAuth disabled, only allows guest comments (name/email).
		login: "enable",
		// Whether to enable post visitor count statistics
		visitorCount: true,
	},

	// Artalk comment system configuration
	artalk: {
		// Artalk backend API address
		server: "https://artalk.example.com/",
		// Set Artalk language
		locale: "en",
		// Whether to enable post visitor count statistics
		visitorCount: true,
	},

	// Giscus comment system configuration
	giscus: {
		// Set Giscus repository
		repo: "CuteLeaf/Firefly",
		// Set Giscus repository ID
		repoId: "R_kgD2gfdFGd",
		// Set Giscus category
		category: "General",
		// Set Giscus category ID
		categoryId: "DIC_kwDOKy9HOc4CegmW",
		// Set Giscus mapping method
		mapping: "title",
		// Set Giscus strict mode
		strict: "0",
		// Set Giscus reactions functionality
		reactionsEnabled: "1",
		// Set Giscus metadata functionality
		emitMetadata: "1",
		// Set Giscus input location
		inputPosition: "top",
		// Set Giscus language
		lang: "en",
		// Set Giscus loading method
		loading: "lazy",
	},

	// Disqus comment system configuration
	disqus: {
		// Set Disqus shortname
		shortname: "firefly",
	},
};
