import type { FriendLink, FriendsPageConfig } from "../types/config";

// You can write custom content below the friend links in src/content/spec/friends.md

// Friends page configuration
export const friendsPageConfig: FriendsPageConfig = {
	// Page title; if empty, use the translation in i18n
	title: "",

	// Page description text; if empty, use the translation in i18n
	description: "",

	// Whether to show custom content from friends.mdx
	showCustomContent: true,

	// Whether to show the comment section; requires enabling the comment system in commentConfig.ts
	showComment: true,

	// Whether to enable random sorting; if enabled, weights are ignored and a random sort is done at build time.
	randomizeSort: false,
};

// Friends link configuration
export const friendsConfig: FriendLink[] = [
	{
		title: "Summer Night Firefly",
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=7618557&s=640",
		desc: "The fire of the firefly rises from the dreamless long night, blooming in the final tomorrow.",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 10, // Weight, larger numbers come first
		enabled: true, // Whether to enable
	},
	{
		title: "Firefly Docs",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "Firefly theme template documentation",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 9,
		enabled: true,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 8,
		enabled: true,
	},
];

// Get enabled friend links and sort them
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
