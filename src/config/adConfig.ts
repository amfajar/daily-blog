import type { AdConfig } from "../types/config";

// This file only configures the advertisement content. 
// To enable/disable, control the sidebar component in sidebarConfig.ts.

// Ad configuration 1 - Pure image ad (no padding)
export const adConfig1: AdConfig = {
	image: {
		src: "assets/images/cover.avif",
		alt: "Ad Banner",
		link: "#",
		external: true,
	},

	// Whether to allow closing the ad
	closable: true,

	// Display count limit, -1 for unlimited
	displayCount: -1,

	// Component padding configuration
	padding: {
		// Zero padding; the image fills the entire component
		all: "0",

		// 1rem padding on all sides
		// all: "1rem",

		// No top padding
		// top: "0",

		// No right padding
		// right: "1rem",

		// No bottom padding
		// bottom: "1rem",

		// No left padding
		// left: "1rem",
	},
};

// Ad configuration 2 - Full content ad
export const adConfig2: AdConfig = {
	title: "Support the Author",
	content:
		"If you find the content of this site helpful, you're welcome to support our creation! Your support is our motivation for continuous updates.",
	image: {
		src: "assets/images/cover.avif",
		alt: "Support the Author",
		link: "about/",
		external: false,
	},
	link: {
		text: "Support",
		url: "about/",
		external: false,
	},
	closable: true,
	displayCount: -1,
	padding: {
		// all: "1rem",
	},
};
