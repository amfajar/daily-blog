import type { SidebarLayoutConfig } from "../types/config";

/**
 * Sidebar layout configuration
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// Whether to enable sidebar functionality
	enable: true,

	// Sidebar position:
	// left: Only show the left sidebar
	// right: Only show the right sidebar
	// both: Dual sidebars; both show above 1280px, one side shows between 769-1279px based on tabletSidebar config
	position: "both",

	// Which side to show on tablet (769-1279px), only takes effect when position is both
	// left: Show the left sidebar on tablet
	// right: Show the right sidebar on tablet
	tabletSidebar: "left",

	// When using a single sidebar (position is left or right), whether to show dual sidebars on post detail pages.
	// When position is left, enabling this will additionally show the right sidebar on post pages.
	// When position is right, enabling this will additionally show the left sidebar on post pages.
	// Useful if you want a single sidebar generally but want dual sidebars for TOC or other components on posts.
	showBothSidebarsOnPostPage: true,

	// Left sidebar component configuration list
	// Rendering order depends entirely on the order in the configuration array, but 'top' components render before 'sticky' ones.
	// type: Component type
	// enable: Whether to enable the component
	// position: Component position ('top' is fixed, 'sticky' follows scroll)
	// showOnPostPage: Whether to show the component on post detail pages
	// showOnNonPostPage: Whether to show the component on non-post pages (shown everywhere except post detail pages)
	// configId: Component config ID (currently only used by advertisement component) to distinguish various ad configs
	// responsive: Responsive configuration (available for some components to set specific parameters)
	leftComponents: [
		{
			// Component type: Profile component
			type: "profile",
			// Whether to enable the component
			enable: true,
			// Component position
			position: "top",
			// Whether to show on post detail pages
			showOnPostPage: true,
		},
		{
			// Component type: Announcement component
			type: "announcement",
			// Whether to enable the component
			enable: true,
			// Component position
			position: "top",
			// Whether to show on post detail pages
			showOnPostPage: true,
		},
		{
			// Component type: Music player
			type: "music",
			// Whether to enable the component
			enable: true,
			// Component position
			position: "sticky",
			// Whether to show on post detail pages
			showOnPostPage: true,
		},
		{
			// Component type: Categories component
			type: "categories",
			// Whether to enable the component
			enable: true,
			// Component position
			position: "sticky",
			// Whether to show on post detail pages
			showOnPostPage: true,
			// Responsive configuration
			responsive: {
				// Collapse threshold: auto-collapse when categories count > 5
				collapseThreshold: 5,
			},
		},
		{
			// Component type: Tags component
			type: "tags",
			// Whether to enable the component
			enable: true,
			// Component position
			position: "sticky",
			// Whether to show on post detail pages
			showOnPostPage: true,
			// Responsive configuration
			responsive: {
				// Collapse threshold: auto-collapse when tags count > 10
				collapseThreshold: 10,
			},
		},
		{
			// Component type: Advertisement component 1
			type: "advertisement",
			// Whether to enable the component
			enable: false,
			// Component position
			position: "sticky",
			// Whether to show on post detail pages
			showOnPostPage: true,
			// Config ID: Use the first ad configuration
			configId: "ad1",
		},
	],

	// Right sidebar component configuration list
	rightComponents: [
		{
			// Component type: Site statistics component
			type: "stats",
			// Whether to enable the component
			enable: true,
			// Component position
			position: "top",
			// Whether to show on post detail pages
			showOnPostPage: true,
		},
		{
			// Component type: Calendar component
			type: "calendar",
			// Whether to enable the component
			enable: true,
			// Component position
			position: "sticky",
			// Whether to show on post detail pages
			showOnPostPage: false,
		},
		{
			// Component type: Sidebar TOC component (only shown on post detail pages)
			type: "sidebarToc",
			// Whether to enable the component
			enable: true,
			// Component position
			position: "sticky",
			// Whether to show on post detail pages
			showOnPostPage: true,
			// Whether to show on non-post pages
			showOnNonPostPage: false,
		},
		{
			// Component type: Advertisement component 2
			type: "advertisement",
			// Whether to enable the component
			enable: false,
			// Component position
			position: "sticky",
			// Whether to show on post detail pages
			showOnPostPage: true,
			// Config ID: Use the second ad configuration
			configId: "ad2",
		},
	],

	// Mobile bottom component configuration list
	// These show at the bottom of the page on mobile (<768px), independent of sidebar configs.
	mobileBottomComponents: [
		{
			// Component type: Profile component
			type: "profile",
			// Whether to enable the component
			enable: true,
			// Whether to show on post detail pages
			showOnPostPage: true,
		},
		{
			// Component type: Announcement component
			type: "announcement",
			// Whether to enable the component
			enable: true,
			// Whether to show on post detail pages
			showOnPostPage: true,
		},
		{
			// Component type: Music player
			type: "music",
			// Whether to enable the component
			enable: true,
			// Whether to show on post detail pages
			showOnPostPage: true,
		},
		{
			// Component type: Categories component
			type: "categories",
			// Whether to enable the component
			enable: true,
			// Whether to show on post detail pages
			showOnPostPage: true,
			// Responsive configuration
			responsive: {
				// Collapse threshold: auto-collapse when categories count > 5
				collapseThreshold: 5,
			},
		},
		{
			// Component type: Tags component
			type: "tags",
			// Whether to enable the component
			enable: true,
			// Whether to show on post detail pages
			showOnPostPage: true,
			// Responsive configuration
			responsive: {
				// Collapse threshold: auto-collapse when tags count > 20
				collapseThreshold: 20,
			},
		},
		{
			// Component type: Site statistics component
			type: "stats",
			// Whether to enable the component
			enable: true,
			// Whether to show on post detail pages
			showOnPostPage: true,
		},
	],
};
