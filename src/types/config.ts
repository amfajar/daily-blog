import type {
	DARK_MODE,
	LIGHT_MODE,
	SYSTEM_MODE,
	WALLPAPER_BANNER,
	WALLPAPER_NONE,
	WALLPAPER_OVERLAY,
} from "../constants/constants";

export type SiteConfig = {
	title: string;
	subtitle: string;
	site_url: string;
	description?: string; // Site description, used to generate <meta name="description">
	keywords?: string[]; // Site keywords, used to generate <meta name="keywords">

	lang: "en" | "zh_CN" | "zh_TW" | "ja" | "ru";

	themeColor: {
		hue: number;
		fixed: boolean;
		defaultMode?: LIGHT_DARK_MODE; // Default mode: Light, Dark, or System
	};

	// Overall page width (unit: rem)
	pageWidth?: number;

	// Card style configuration
	card: {
		// Whether to enable card borders and shadow 3D effects
		border: boolean;
		// Whether the card style follows the theme hue
		followTheme?: boolean;
	};

	// Font configuration
	font: FontConfig;

	// Site start date, used to calculate running days
	siteStartDate?: string; // Format: "YYYY-MM-DD"

	// Optional: Site timezone using IANA identifier (e.g., "Asia/Shanghai", "UTC")
	timezone?: string;

	// Callout (Admonition) configuration
	rehypeCallouts: {
		theme: "github" | "obsidian" | "vitepress";
	};

	// Bangumi configuration
	bangumi?: {
		userId?: string; // Bangumi user ID
		categoryOrder?: ("anime" | "game" | "book" | "music" | "real")[]; // Category display order
	};

	generateOgImages: boolean;
	favicon: Array<{
		src: string;
		theme?: "light" | "dark";
		sizes?: string;
	}>;

	navbar: {
		/** Navbar logo icon: icon library, local image, or network URL */
		logo?: {
			type: "icon" | "image" | "url";
			value: string; // Icon name, local path, or network URL
			alt?: string; // Image alt text
		};
		title?: string; // Navbar title (uses site title if unset)
		widthFull?: boolean; // Whether navbar takes full screen width
		menuAlign?: "left" | "center"; // Menu alignment (desktop only)
		followTheme?: boolean; // Whether navbar icons/title follow theme color
		stickyNavbar?: boolean; // Whether navbar is fixed at the top
	};

	showLastModified: boolean; // Toggle for "Last Modified" card
	outdatedThreshold?: number; // Threshold (days) to show "Last Modified" card for outdated posts
	sharePoster?: boolean; // Whether to show share poster button

	// Page toggle configuration
	pages: {
		friends: boolean; // Friends page toggle
		sponsor: boolean; // Sponsor page toggle
		guestbook: boolean; // Guestbook page toggle
		bangumi: boolean;
		gallery: boolean; // Gallery page toggle
	};

	// Category bar toggle
	categoryBar?: boolean;

	// Post list layout configuration
	postListLayout: {
		defaultMode: "list" | "grid"; // Default layout: list or grid
		allowSwitch: boolean; // Whether to allow users to switch layouts
		grid: {
			// Grid config (only if defaultMode is grid or allowSwitch is true)
			// Whether to enable masonry layout
			masonry: boolean;
			// Min card width (px); columns calculated automatically. Default 320
			columnWidth?: number;
		};
	};

	// Pagination configuration
	pagination: {
		postsPerPage: number; // Number of posts per page
	};

	// Analytics configuration
	analytics?: {
		googleAnalyticsId?: string; // Google Analytics ID
		microsoftClarityId?: string; // Microsoft Clarity ID
		umamiAnalytics?: {
			websiteId?: string; // Umami Website ID
			scriptUrl?: string; // Umami JS URL (supports self-hosted)
		};
		la51Analytics?: {
			Id?: string; // 51la Analytics ID
			sdkUrl?: string; // Custom SDK URL; defaults to "//sdk.51.la/js-sdk-pro.min.js"
			ck?: string; // Data separation identifier
			autoTrack?: boolean; // Enable auto event tracking
			hashMode?: boolean; // Hash mode for SPA tracking
			screenRecord?: boolean; // Enable session recording
		};
	};

	// Image optimization configuration
	imageOptimization?: {
		/**
		 * Output image formats
		 * - "avif": AVIF only (smallest size, lower compatibility)
		 * - "webp": WebP only (good balance)
		 * - "both": Both AVIF and WebP (recommended)
		 */
		formats?: "avif" | "webp" | "both";
		/**
		 * Image compression quality (1-100)
		 * Recommended 70-85
		 */
		quality?: number;
		/**
		 * Add referrerpolicy="no-referrer" to specific domains
		 * Helps fix 403 errors for restricted images
		 * Example: ["i0.hdslb.com", "*.bilibili.com"]
		 * Only affects matched image tags
		 */
		noReferrerDomains?: string[];
	};
};

export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};

export enum LinkPreset {
	Home = 0,
	Archive = 1,
	About = 2,
	Friends = 3,
	Sponsor = 4,
	Guestbook = 5,
	Bangumi = 6,
	Gallery = 7,
}

export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
	icon?: string; // Menu item icon
	children?: (NavBarLink | LinkPreset)[]; // Submenu support
};

export enum NavBarSearchMethod {
	PageFind = 0,
}

export type NavBarSearchConfig = {
	method: NavBarSearchMethod;
};

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
		showName?: boolean;
	}[];
};

export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};
// Comment configuration

export type CommentConfig = {
	/**
	 * Enabled comment system type
	 * "none" | "twikoo" | "waline" | "giscus" | "disqus" | "artalk"
	 */
	type: "none" | "twikoo" | "waline" | "giscus" | "disqus" | "artalk";
	twikoo?: {
		envId: string;
		region?: string;
		lang?: string;
		visitorCount?: boolean;
	};
	waline?: {
		serverURL: string;
		lang?: string;
		emoji: string[];
		login?: "enable" | "force" | "disable";
		visitorCount?: boolean; // Whether to track visitor counts
	};
	artalk?: {
		// API server address
		server: string;
		/**
		 * Supported locales:
		 * - "en" (English)
		 * - "zh-CN" (简体中文)
		 * - "zh-TW" (繁体中文)
		 * - "ja" (日本語)
		 * - "ko" (한국어)
		 * - "fr" (Français)
		 * - "ru" (Русский)
		 * */
		locale: string | "auto";
		// Whether to track visitor counts
		visitorCount?: boolean;
	};
	giscus?: {
		repo: string;
		repoId: string;
		category: string;
		categoryId: string;
		mapping: string;
		strict: string;
		reactionsEnabled: string;
		emitMetadata: string;
		inputPosition: string;
		lang: string;
		loading: string;
	};
	disqus?: {
		shortname: string;
	};
};

export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof SYSTEM_MODE;

export type WALLPAPER_MODE =
	| typeof WALLPAPER_BANNER
	| typeof WALLPAPER_OVERLAY
	| typeof WALLPAPER_NONE;

export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	category?: string;
	pinned?: boolean;
	prevTitle?: string;
	prevSlug?: string;
	nextTitle?: string;
	nextSlug?: string;
};

export type ExpressiveCodeConfig = {
	/** @deprecated Use darkTheme and lightTheme instead */
	theme?: string;
	/** Dark theme name */
	darkTheme: string;
	/** Light theme name */
	lightTheme: string;
	/** Code block collapsible plugin config */
	pluginCollapsible?: PluginCollapsibleConfig;
	/** Language badge plugin config */
	pluginLanguageBadge?: PluginLanguageBadgeConfig;
};

export type PluginLanguageBadgeConfig = {
	enable: boolean; // Whether to enable language badges
};

export type PluginCollapsibleConfig = {
	enable: boolean; // Whether to enable code block collapsing
	lineThreshold: number; // Line threshold to trigger collapsing
	previewLines: number; // Number of preview lines when collapsed
	defaultCollapsed: boolean; // Whether to collapse by default
};

export type AnnouncementConfig = {
	// enable attribute removed; controlled via sidebarLayoutConfig now
	title?: string; // Announcement title
	content: string; // Announcement content
	icon?: string; // Announcement icon
	type?: "info" | "warning" | "success" | "error"; // Announcement type
	closable?: boolean; // Whether closable
	link?: {
		enable: boolean; // Whether to enable link
		text: string; // Link text
		url: string; // Link URL
		external?: boolean; // Whether external link
	};
};

// Individual font configuration
export type FontItem = {
	id: string; // Unique font identifier
	name: string; // Font display name
	src: string; // Font path or URL
	family: string; // CSS font-family name
	weight?: string | number; // Font weight (e.g., "normal", "bold", 400)
	style?: "normal" | "italic" | "oblique"; // Font style
	display?: "auto" | "block" | "swap" | "fallback" | "optional"; // font-display property
	unicodeRange?: string; // Unicode range for subsetting
	format?:
		| "woff"
		| "woff2"
		| "truetype"
		| "opentype"
		| "embedded-opentype"
		| "svg"; // Font format (required for local files)
};

// Font configuration
export type FontConfig = {
	enable: boolean; // Whether to enable custom fonts
	selected: string | string[]; // Selected font IDs
	fonts: Record<string, FontItem>; // Font library (ID as key)
	fallback?: string[]; // Global font fallback list
	preload?: boolean; // Whether to preload font files
};

export type FooterConfig = {
	enable: boolean; // Whether to enable custom footer HTML
	customHtml?: string; // Custom HTML content (e.g., ICP filing)
};

export type CoverImageConfig = {
	enableInPost: boolean; // Whether to show cover image in post pages
	randomCoverImage: {
		enable: boolean; // Whether to enable random cover images
		apis: string[]; // Random image API list
		fallback?: string; // Fallback image path
		showLoading?: boolean; // Whether to show loading animation
	};
};

// Widget component configuration types
export type WidgetComponentType =
	| "profile"
	| "announcement"
	| "categories"
	| "tags"
	| "sidebarToc"
	| "advertisement"
	| "stats"
	| "calendar"
	| "music";

export type WidgetComponentConfig = {
	type: WidgetComponentType; // Component type
	enable: boolean; // Whether to enable component
	position: "top" | "sticky"; // Position: top or sticky
	configId?: string; // Config ID (e.g., for ads)
	showOnPostPage?: boolean; // Whether to show on post pages
	showOnNonPostPage?: boolean; // Whether to show on non-post pages
	responsive?: {
		hidden?: ("mobile" | "tablet" | "desktop")[]; // Hide on specific devices
		collapseThreshold?: number; // Collapse threshold
	};
	customProps?: Record<string, unknown>; // Custom props for extension
};

export type MobileBottomComponentConfig = {
	type: WidgetComponentType; // Component type
	enable: boolean; // Whether to enable component
	configId?: string; // Config ID (e.g., for ads)
	showOnPostPage?: boolean; // Whether to show on post pages
	showOnNonPostPage?: boolean; // Whether to show on non-post pages
	responsive?: {
		hidden?: ("mobile" | "tablet" | "desktop")[]; // Hide on specific devices
		collapseThreshold?: number; // Collapse threshold
	};
	customProps?: Record<string, unknown>; // Custom props for extension
};

export type SidebarLayoutConfig = {
	enable: boolean; // Whether to enable sidebar
	position: "left" | "right" | "both"; // Position: left, right, or both
	tabletSidebar?: "left" | "right"; // Sidebar to show on tablet (if position is both)
	showBothSidebarsOnPostPage?: boolean; // Whether to show both sidebars on post pages
	leftComponents: WidgetComponentConfig[]; // Left sidebar components
	rightComponents: WidgetComponentConfig[]; // Right sidebar components
	mobileBottomComponents: MobileBottomComponentConfig[]; // Mobile bottom components (<768px)
};

export type SakuraConfig = {
	enable: boolean; // Whether to enable Sakura effect
	sakuraNum: number; // Number of petals. Default 21
	limitTimes: number; // Out-of-bounds limit. -1 for infinite
	size: {
		min: number; // Min size multiplier
		max: number; // Max size multiplier
	};
	opacity: {
		min: number; // Min opacity
		max: number; // Max opacity
	};
	speed: {
		horizontal: {
			min: number; // Min horizontal speed
			max: number; // Max horizontal speed
		};
		vertical: {
			min: number; // Min vertical speed
			max: number; // Max vertical speed
		};
		rotation: number; // Rotation speed
		fadeSpeed: number; // Fade speed
	};
	zIndex: number; // z-index for the effect
};

// Spine Live2D widget configuration
export type SpineModelConfig = {
	enable: boolean; // Whether to enable Spine Live2D widget
	model: {
		path: string; // Model JSON path
		scale?: number; // Model scale. Default 1.0
		x?: number; // X offset. Default 0
		y?: number; // Y offset. Default 0
	};
	position: {
		corner: "bottom-left" | "bottom-right" | "top-left" | "top-right"; // Display position
		offsetX?: number; // Horizontal offset. Default 20px
		offsetY?: number; // Vertical offset. Default 20px
	};
	size: {
		width?: number; // Container width. Default 280px
		height?: number; // Container height. Default 400px
	};
	interactive?: {
		enabled?: boolean; // Whether to enable interactions. Default true
		clickAnimations?: string[]; // Random animations on click
		clickMessages?: string[]; // Random messages on click
		messageDisplayTime?: number; // Message display duration. Default 3000ms
		idleAnimations?: string[]; // Idle animations
		idleInterval?: number; // Idle animation interval. Default 10000ms
	};
	responsive?: {
		hideOnMobile?: boolean; // Hide on mobile. Default false
		mobileBreakpoint?: number; // mobile breakpoint. Default 768px
	};
	zIndex?: number; // z-index. Default 1000
	opacity?: number; // Opacity (0-1). Default 1.0
};

// Live2D widget configuration
export type Live2DModelConfig = {
	enable: boolean; // Whether to enable Live2D widget
	model: {
		path: string; // Model folder or model3.json path
	};
	position?: {
		corner?: "bottom-left" | "bottom-right" | "top-left" | "top-right"; // Display position. Default bottom-right
		offsetX?: number; // Horizontal offset. Default 20px
		offsetY?: number; // Vertical offset. Default 20px
	};
	size?: {
		width?: number; // Container width. Default 280px
		height?: number; // Container height. Default 250px
	};
	interactive?: {
		enabled?: boolean; // Whether to enable interactions. Default true
		// motions and expressions will be read automatically from the model JSON
		clickMessages?: string[]; // Random messages on click
		messageDisplayTime?: number; // Message display duration. Default 3000ms
	};
	responsive?: {
		hideOnMobile?: boolean; // Hide on mobile. Default false
		mobileBreakpoint?: number; // mobile breakpoint. Default 768px
	};
};

export type BackgroundWallpaperConfig = {
	mode: "banner" | "overlay" | "none"; // Wallpaper mode: banner, overlay, or none
	switchable?: boolean; // Whether to allow switching wallpaper modes. Default true
	src:
		| string
		| string[]
		| {
				desktop?: string | string[];
				mobile?: string | string[];
		  }; // Supports string, string array, or desktop/mobile specific paths

	// Banner mode specific configuration
	banner?: {
		position?:
			| "top"
			| "center"
			| "bottom"
			| "top left"
			| "top center"
			| "top right"
			| "center left"
			| "center center"
			| "center right"
			| "bottom left"
			| "bottom center"
			| "bottom right"
			| "left top"
			| "left center"
			| "left bottom"
			| "right top"
			| "right center"
			| "right bottom"
			| string; // Wallpaper position (CSS object-position values)
		homeText?: {
			enable: boolean; // Whether to show custom text on homepage
			switchable?: boolean; // Whether to allow toggling banner text
			title?: string; // Main title
			subtitle?: string | string[]; // Subtitle(s)
			titleSize?: string; // Main title font size
			subtitleSize?: string; // Subtitle font size
			typewriter?: {
				enable: boolean; // Whether to enable typewriter effect
				speed: number; // Typing speed (ms)
				deleteSpeed: number; // Deletion speed (ms)
				pauseTime: number; // Pause time (ms)
			};
		};
		credit?: {
			enable:
				| boolean
				| {
						desktop: boolean; // Show credit text on desktop
						mobile: boolean; // Show credit text on mobile
				  }; // Whether to show banner credit text
			text:
				| string
				| {
						desktop: string; // Desktop credit text
						mobile: string; // Mobile credit text
				  }; // Banner credit text
			url?:
				| string
				| {
						desktop: string; // Desktop original artwork/artist URL
						mobile: string; // Mobile original artwork/artist URL
				  }; // Original artwork URL
		};
		navbar?: {
			transparentMode?: "semi" | "full" | "semifull"; // Navbar transparency mode
			enableBlur?: boolean; // Whether to enable glassmorphism blur
			blur?: number; // Blur amount
		};
		waves?: {
			enable:
				| boolean
				| {
						desktop: boolean; // Enable waves animation on desktop
						mobile: boolean; // Enable waves animation on mobile
				  }; // Whether to enable waves animation
			switchable?: boolean; // Whether to allow toggling waves animation
		};
	};
	// Overlay mode specific configuration
	overlay?: {
		switchable?:
			| boolean
			| {
					opacity?: boolean; // Allow adjusting wallpaper opacity
					blur?: boolean; // Allow adjusting background blur
					cardOpacity?: boolean; // Allow adjusting card opacity
			  }; // Whether overlay parameters are adjustable
		zIndex?: number; // Wallpaper z-index
		opacity?: number; // Wallpaper opacity (0-1)
		blur?: number; // Background blur (px)
		cardOpacity?: number; // Card background opacity (0-1)
	};
};

// Ad bar configuration
export type AdConfig = {
	title?: string; // Ad title
	content?: string; // Ad text content
	image?: {
		src: string; // Image URL
		alt?: string; // Image description
		link?: string; // Click-through link
		external?: boolean; // Whether external link
	};
	link?: {
		text: string; // Link text
		url: string; // Link URL
		external?: boolean; // Whether external link
	};
	padding?: {
		top?: string; // Top padding
		right?: string; // Right padding
		bottom?: string; // Bottom padding
		left?: string; // Left padding
		all?: string; // Global padding
	};
	closable?: boolean; // Whether closable
	displayCount?: number; // Display count limit. -1 for unlimited
	expireDate?: string; // Expiration date (ISO 8601)
};

// Friend link configuration
export type FriendLink = {
	title: string; // Friend link title
	imgurl: string; // Avatar image URL
	desc: string; // Friend link description
	siteurl: string; // Friend link site URL
	tags?: string[]; // Tags array
	weight: number; // Sort weight (higher is prioritized)
	enabled: boolean; // Whether enabled
};

export type FriendsPageConfig = {
	title?: string; // Page title (uses i18n if empty)
	description?: string; // Page description (uses i18n if empty)
	showCustomContent?: boolean; // Whether to show custom content from friends.mdx
	showComment?: boolean; // Whether to show comment section. Default true
	randomizeSort?: boolean; // Whether to randomize sort order (ignores weight)
};

// Music player configuration
export type MusicPlayerConfig = {
	mode?: "meting" | "local"; // Mode: "meting" (Meting API) or "local" (local playlist)

	// Default volume (0-1)
	volume?: number;

	// Playback mode: list, one, or random
	playMode?: "list" | "one" | "random";

	// Whether to show lyrics
	showLyrics?: boolean;

	// Whether to show player in navbar
	showInNavbar?: boolean;

	// Meting API configuration
	meting?: {
		// Meting API URL
		api?: string;

		// Music server: netease, tencent, kugou, xiami, or baidu
		server?: "netease" | "tencent" | "kugou" | "xiami" | "baidu";

		// Type: song, playlist, album, search, or artist
		type?: "song" | "playlist" | "album" | "search" | "artist";

		// ID or search query
		id?: string;

		// Auth token (optional)
		auth?: string;

		// Fallback Meting API URLs
		fallbackApis?: string[];
	};

	// Local music configuration (used when mode is 'local')
	local?: {
		playlist?: Array<{
			name: string; // Song name
			artist: string; // Artist
			url: string; // Audio file URL
			cover?: string; // Cover image URL
			lrc?: string; // Lyrics content (LRC format)
		}>;
	};
};

// Sponsor method types
export type SponsorMethod = {
	name: string; // Sponsor method name (e.g., "Alipay", "PayPal")
	icon?: string; // Icon name (Iconify format)
	qrCode?: string; // QR code image path
	link?: string; // Sponsor link URL
	description?: string; // Description text
	enabled: boolean; // Whether enabled
};

// Sponsor list item
export type SponsorItem = {
	name: string; // Sponsor name
	amount?: string; // Sponsor amount (optional)
	date?: string; // Sponsorship date (optional, ISO)
};

// Sponsor configuration
export type SponsorConfig = {
	title?: string; // Page title (uses i18n default)
	description?: string; // Page description text
	usage?: string; // Sponsorship usage explanation
	methods: SponsorMethod[]; // List of sponsor methods
	sponsors?: SponsorItem[]; // List of sponsors (optional)
	showSponsorsList?: boolean; // Whether to show sponsors list. Default true
	showComment?: boolean; // Whether to show comment section. Default false
	showButtonInPost?: boolean; // Whether to show sponsor button in posts. Default true
};

// 响应式图像布局类型
export type ResponsiveImageLayout = "constrained" | "full-width" | "none";

// 图像格式类型
export type ImageFormat = "avif" | "webp" | "png" | "jpg" | "jpeg" | "gif";

// Album metadata
export type GalleryAlbum = {
	id: string; // Album ID (slug and directory name)
	name: string; // Album name
	description?: string; // Album description
	date?: string; // Date
	location?: string; // Shooting location
	tags?: string[]; // Tags for filtering
	cover?: string; // Manually specify cover image (optional)
};

// Gallery configuration
export type GalleryConfig = {
	albums: GalleryAlbum[];
	columnWidth?: number; // Min column width (px) for masonry. Default 240
};
