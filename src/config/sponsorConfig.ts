import type { SponsorConfig } from "../types/config";

export const sponsorConfig: SponsorConfig = {
	// Page title; if empty, use the translation in i18n
	title: "",

	// Page description text; if empty, use the translation in i18n
	description: "",

	// Sponsorship usage explanation
	usage:
		"Your sponsorship will be used for server maintenance, content creation, and feature development, helping me continue to provide high-quality content.",

	// Whether to show the sponsors list
	showSponsorsList: true,

	// Whether to show the comment section; requires first enabling the comment system in commentConfig.ts
	showComment: true,

	// Whether to show the sponsor button at the bottom of post detail pages
	showButtonInPost: true,

	// Sponsorship methods list
	methods: [
		{
			name: "Alipay",
			icon: "fa7-brands:alipay",
			// Path to the payment QR code image (must be in the public directory)
			qrCode: "/assets/images/sponsor/alipay.png",
			link: "",
			description: "Sponsor via Alipay QR code",
			enabled: true,
		},
		{
			name: "WeChat",
			icon: "fa7-brands:weixin",
			qrCode: "/assets/images/sponsor/wechat.png",
			link: "",
			description: "Sponsor via WeChat QR code",
			enabled: true,
		},
		{
			name: "ko-fi",
			icon: "simple-icons:kofi",
			qrCode: "",
			link: "https://ko-fi.com/cuteleaf",
			description: "Buy a Coffee for Firefly",
			enabled: true,
		},
		{
			name: "Afdian",
			icon: "simple-icons:afdian",
			qrCode: "",
			link: "https://ifdian.net/a/cuteleaf",
			description: "Sponsor via Afdian",
			enabled: true,
		},
	],

	// Sponsors list (optional)
	sponsors: [
		// Example: Identified sponsor
		{
			name: "Summer Leaf",
			amount: "¥50",
			date: "2025-10-01",
		},

		// Example: Anonymous sponsor
		{
			name: "Anonymous User",
			amount: "¥20",
			date: "2025-10-01",
		},
	],
};
