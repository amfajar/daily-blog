import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";

// Blog Navigation "Ruang Tumbuh"
// Home → Archive (/archive/) | Roadmap (/roadmap/) | Portfolio (/portfolio/) | About (/about/)
const links: (NavBarLink | LinkPreset)[] = [
	// Home
	LinkPreset.Home,

	// Posts Archive
	LinkPreset.Archive,

	// Roadmap Page - Monthly learning plan
	{
		name: "Roadmap",
		url: "/roadmap/",
		icon: "material-symbols:map-outline-rounded",
	},

	// Portfolio Page - BI Analyst Projects
	{
		name: "Portfolio",
		url: "/portfolio/",
		icon: "material-symbols:folder-open-outline-rounded",
	},

	// About Me
	LinkPreset.About,
];

// Navigation search configuration
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = { links };
