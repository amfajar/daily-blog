// Config Index File - Centralized export of all configurations
// This allows components to import multiple related configurations at once, reducing repetitive import statements.

// Type Exports
export type {
	AnnouncementConfig,
	BackgroundWallpaperConfig,
	CommentConfig,
	CoverImageConfig,
	ExpressiveCodeConfig,
	FooterConfig,
	GalleryAlbum,
	GalleryConfig,
	LicenseConfig,
	MusicPlayerConfig,
	NavBarConfig,
	ProfileConfig,
	SakuraConfig,
	SidebarLayoutConfig,
	SiteConfig,
	SponsorConfig,
	SponsorItem,
	SponsorMethod,
	WidgetComponentConfig,
	WidgetComponentType,
} from "../types/config";

export { adConfig1, adConfig2 } from "./adConfig"; // Advertisement configuration
export { announcementConfig } from "./announcementConfig"; // Announcement configuration

// Style Configurations
export { backgroundWallpaper } from "./backgroundWallpaper"; // Background wallpaper configuration

// Functional Configurations
export { commentConfig } from "./commentConfig"; // Comment system configuration
export { coverImageConfig } from "./coverImageConfig"; // Cover image configuration
export { expressiveCodeConfig } from "./expressiveCodeConfig"; // Code highlighting configuration
export { fontConfig } from "./fontConfig"; // Font configuration
export { footerConfig } from "./footerConfig"; // Footer configuration
export { friendsPageConfig, getEnabledFriends } from "./friendsConfig"; // Friends link configuration
export { galleryConfig } from "./galleryConfig"; // Gallery configuration
export { licenseConfig } from "./licenseConfig"; // License configuration

// Component Configurations
export { musicPlayerConfig } from "./musicConfig"; // Music player configuration
export { navBarConfig, navBarSearchConfig } from "./navBarConfig"; // Navigation bar and search configuration
export { live2dModelConfig, spineModelConfig } from "./pioConfig"; // Mascot (Pio) configuration
export { profileConfig } from "./profileConfig"; // User profile configuration
export { sakuraConfig } from "./sakuraConfig"; // Sakura effect configuration

// Layout Configurations
export { sidebarLayoutConfig } from "./sidebarConfig"; // Sidebar layout configuration

// Core Configurations
export { siteConfig } from "./siteConfig"; // Base site configuration
export { sponsorConfig } from "./sponsorConfig"; // Sponsor configuration
