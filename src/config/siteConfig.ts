import type { SiteConfig } from "@/types/config";
import { fontConfig } from "./fontConfig";

// Define site language
// Language code, e.g., 'zh_CN', 'zh_TW', 'en', 'ja', 'ru'.
const SITE_LANG = "en";

export const siteConfig: SiteConfig = {
	// Site title
	title: "Amfajar",

	// Site subtitle
	subtitle: "Daily learning notes — Japanese · English · Communication · BI Analyst",

	// Site URL
	site_url: "https://amfajar.zone.id",

	// Site description
	description:
		"A personal blog documenting my daily learning journey in Japanese, English, Communication, and Data Analytics.",

	// Site keywords
	keywords: [
		"Amfajar",
		"learning",
		"self-learner",
		"Japanese",
		"BI Analyst",
		"Data Analytics",
		"blog",
	],

	// Theme color
	themeColor: {
		// Default hue for primary color, range 0 to 360. E.g., Red: 0, Cyan: 200, Teal: 250, Pink: 345
		hue: 165,
		// Hide theme color picker from visitors
		fixed: false,
		// Default mode: "light", "dark", or "system"
		defaultMode: "system",
	},

	// Page width (rem)
	// Higher value makes the content area wider
	// Consider lower values if using single sidebar for better visual effect.
	pageWidth: 100,

	// Website Card style configuration
	card: {
		// Turn on card border and shadow for 3D effect
		border: false,
		// Make card style follow theme primary color
		followTheme: false,
	},

	// Favicon configuration
	favicon: [
		{
			// Icon file path
			src: "/favicon/favicon.ico",
			// Optional, specify theme 'light' | 'dark'
			// theme: "light",
			// Optional, icon sizes
			// sizes: "32x32",
		},
	],

	// Navigation bar configuration
	navbar: {
		// Navigation bar Logo
		// Supported types:
		// 1. Astro icon: { type: "icon", value: "material-symbols:home-pin-outline" }
		// 2. Local image (public folder, unoptimized): { type: "image", value: "/assets/images/logo.webp", alt: "Logo" }
		// 3. Local image (src folder, auto-optimized, recommended): { type: "image", value: "assets/images/logo.webp", alt: "Logo" }
		// 4. Remote URL: { type: "url", value: "https://example.com/logo.png", alt: "Logo" }
		logo: {
			type: "image",
			value: "assets/images/firefly.png",
			alt: "🍀",
		},
		// Navigation bar title
		title: "Amfajar",
		// Full width navigation bar
		widthFull: false,
		// Menu alignment, left | center
		menuAlign: "center",
		// Navbar icon and title follow theme color
		followTheme: false,
		// Sticky navigation bar
		stickyNavbar: true,
	},

	// Site start date, used for running days counter
	siteStartDate: "2026-03-20",

	// Site timezone (IANA timezone string)
	timezone: "Asia/Jakarta",

	// Admonitions (Callouts) configuration, requires dev server restart to take effect
	// themes: 'github' | 'obsidian' | 'vitepress', syntax and style vary by theme
	rehypeCallouts: {
		theme: "github",
	},

	// Show "last modified" card at the bottom of post pages
	showLastModified: true,

	// Post outdated threshold (days), show outdated warning if exceeded
	outdatedThreshold: 30,

	// Enable share poster generation feature
	sharePoster: true,

	// OpenGraph image generation, slow rendering, not recommended for local dev
	generateOgImages: false,

	// Bangumi configuration
	bangumi: {
		// Bangumi User ID
		userId: "1143164",
		// Category display order, ordered types will show first
		// Available: "anime" | "book" | "music" | "game" | "real" (real is not supported yet)
		// Unlisted types fallback to default order after these
		categoryOrder: ["anime", "book", "music", "game"],
	},

	// Page visibility configuration - toggle specific pages access, false returns 404
	// Bangumi data is fetched at build time, so it's not real-time. Please configure bangumi.userId
	pages: {
		// Friends link page
		friends: false,
		// Sponsor page
		sponsor: false,
		// Guestbook page
		guestbook: false,
		// Bangumi plans page (includes anime, games, books, music)
		bangumi: false,
		// Gallery page
		gallery: false,
	},

	// Category bar in posts and archive pages
	categoryBar: true,

	// Post list layout configuration
	postListLayout: {
		// Default mode: "list" (single column), "grid" (multi-column)
		defaultMode: "list",
		// Allow users to switch layouts
		allowSwitch: true,
		// Grid layout config, applied when defaultMode is "grid" or switch layout is allowed
		grid: {
			// Enable masonry layout, recommended if mixing posts with and without covers
			masonry: false,
			// Grid item min-width (px), default 280
			columnWidth: 320,
		},
	},

	// Pagination configuration
	pagination: {
		// Posts per page
		postsPerPage: 10,
	},

	// Analytics configuration
	analytics: {
		// Google Analytics ID
		googleAnalyticsId: "",
		// Microsoft Clarity ID
		microsoftClarityId: "",
		// Umami Analytics
		umamiAnalytics: {
			// Umami Website ID
			websiteId: "",
			// Umami JS URL
			scriptUrl: "https://cloud.umami.is/script.js",
		},
		la51Analytics: {
			Id: "",
			sdkUrl: "",
			ck: "",
			autoTrack: false,
			hashMode: false,
			screenRecord: true,
		},
	},

	// Image optimization and responsive settings
	// Output kept as avif or webp only
	// Responsive images improve performance by resizing for different screens
	// Astro only optimizes src images; more src images means longer build time!
	// Docs: https://docs.astro.build/en/guides/images/
	imageOptimization: {
		// Formats
		// - "avif": AVIF only (smallest size, lower compat)
		// - "webp": WebP only (good balance)
		// - "both": Both AVIF and WebP (recommended, browser selects best)
		formats: "webp",
		// Compression quality (1-100)
		quality: 85,
		// Add referrerpolicy="no-referrer" for specific domains
		// e.g. ["i0.hdslb.com", "*.bilibili.com"]
		noReferrerDomains: [],
	},

	// Font config
	// Set specific fonts in src/config/fontConfig.ts
	font: fontConfig,

	// Site language, defined at the top as SITE_LANG
	lang: SITE_LANG,
};
