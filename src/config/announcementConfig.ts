import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	// Announcement title
	title: "Welcome! 🌱",

	// Announcement content
	content: "Welcome to My Blog! This is my daily learning journal. Feel free to explore!",

	// Allow user to close the announcement
	closable: true,

	link: {
		// Enable link
		enable: true,
		// Link text
		text: "About me",
		// Link URL
		url: "/about/",
		// Internal link
		external: false,
	},
};
