import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	// Avatar — replace this path with your avatar
	avatar: "assets/images/avatar.avif",

	// Name — replace with your name
	name: "Author",

	// Short bio
	bio: "Self-learner building myself from scratch 🌱",

	// Social links — update according to your accounts
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/amfajar",
			showName: false,
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
	],
};
