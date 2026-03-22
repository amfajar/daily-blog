import type { BackgroundWallpaperConfig } from "@/types/config";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	// Wallpaper mode: "banner" for banner wallpaper, "overlay" for full-screen transparency, "none" for solid background without wallpaper
	mode: "banner",
	// Whether to allow users to switch wallpaper modes via the navigation bar. Set to false to improve performance (only renders the current mode).
	switchable: true,
	/**
	 * Background image configuration
	 * Image paths support three formats:
	 * 1. public directory (starts with "/", no optimization): "/assets/images/banner.avif"
	 * 2. src directory (does not start with "/", auto-optimized but increases build time, recommended): "assets/images/banner.avif"
	 * 3. Remote URL: "https://example.com/banner.jpg"
	 * Note: Images in the remote URL and public directory won't be optimized. Ensure the image volume is small enough to avoid affecting loading speed.
	 *
	 * It's recommended not to replace default example images (d1-d6, m1-m6), but you can delete them to save space.
	 * Since example images might be updated in the future, your custom images might be overwritten if you use these names.
	 * Therefore, it's suggested to name your own images differently and avoid using d1-d6 or m1-m6.
	 *
	 * If using only one image or a random image API, the string format is recommended:
	 * desktop: "https://t.alcy.cc/pc",   // Random image API
	 * desktop: "assets/images/DesktopWallpaper/d1.avif", // Single image
	 *
	 * mobile: "https://t.alcy.cc/mp", // Random image API
	 * mobile: "assets/images/MobileWallpaper/m1.avif", // Single image
	 *
	 * Supports multi-image configurations (arrays); one will be randomly shown on each page refresh:
	 * desktop: [
	 * "assets/images/DesktopWallpaper/d1.avif",
	 * "assets/images/DesktopWallpaper/d2.avif",
	 * "assets/images/DesktopWallpaper/d3.avif",
	 * "assets/images/DesktopWallpaper/d4.avif",
	 * "assets/images/DesktopWallpaper/d5.avif",
	 * "assets/images/DesktopWallpaper/d6.avif",
	 * ],
	 *
	 * mobile: [
	 * "assets/images/MobileWallpaper/m1.avif",
	 * "assets/images/MobileWallpaper/m2.avif",
	 * "assets/images/MobileWallpaper/m3.avif",
	 * "assets/images/MobileWallpaper/m4.avif",
	 * "assets/images/MobileWallpaper/m5.avif",
	 * "assets/images/MobileWallpaper/m6.avif",
	 * ],
	 */
	src: {
		// Desktop background image (supports single or multiple random)
		desktop: [
			"assets/images/DesktopWallpaper/d1.avif",
			"assets/images/DesktopWallpaper/d2.avif",
			"assets/images/DesktopWallpaper/d3.avif",
			"assets/images/DesktopWallpaper/d4.avif",
			"assets/images/DesktopWallpaper/d5.avif",
			"assets/images/DesktopWallpaper/d6.avif",
		],
		// Mobile background image (supports single or multiple random)
		mobile: [
			"assets/images/MobileWallpaper/m1.avif",
			"assets/images/MobileWallpaper/m2.avif",
			"assets/images/MobileWallpaper/m3.avif",
			"assets/images/MobileWallpaper/m4.avif",
			"assets/images/MobileWallpaper/m5.avif",
			"assets/images/MobileWallpaper/m6.avif",
		],
	},
	// Banner mode specific configuration
	banner: {
		// Image position
		// Supports all CSS object-position values, e.g., 'top', 'center', 'bottom', 'left top', 'right bottom', '25% 75%', '10px 20px'...
		position: "0% 20%",

		// Home banner text
		homeText: {
			// Whether to enable home banner text
			enable: true,
			// Whether to allow users to switch banner title display via the control panel
			switchable: true,
			// Home banner main title
			title: "AMFAJAR",
			// Home banner main title font size
			titleSize: "3.8rem",
			// Home banner subtitle
			subtitle: [
				"Hi there! I'm Fajar. Welcome to my blog.",
				"I write about data, languages, and my daily notes.",
				"Learning data analytics, one step at a time.",
				"Practicing Japanese and English every single day.",
				"Writing things down helps me learn better.",
				"Happy to have you here. Let's learn together!",
			],
			// Home banner subtitle font size
			subtitleSize: "1.5rem",
			typewriter: {
				// Whether to enable typewriter effect. 
				// Typewriter ON → Cycles through all subtitles. 
				// Typewriter OFF → Randomly displays one subtitle on each refresh.
				enable: true,
				// Typing speed (ms)
				speed: 100,
				// Deletion speed (ms)
				deleteSpeed: 50,
				// Pause time after fully displayed (ms)
				pauseTime: 2000,
			},
		},
		// Image source
		credit: {
			enable: {
				// Show banner image credit text on desktop
				desktop: true,
				// Show banner image credit text on mobile
				mobile: true,
			},
			text: {
				// Credit text to display on desktop
				desktop: "Artist: Wanwanmiao (Pixiv)",
				// Credit text to display on mobile
				mobile: "Pixiv - KiraraShss",
			},
			url: {
				// URL link to the original artwork or artist page on desktop
				desktop: "https://www.pixiv.net/users/108801776",
				// URL link to the original artwork or artist page on mobile
				mobile: "https://www.pixiv.net/users/42715864",
			},
		},
		// Banner navigation bar configuration
		navbar: {
			// Banner navigation bar transparent mode: "semi" for semi-transparent, "full" for fully transparent, "semifull" for dynamic transparency
			transparentMode: "semifull",
			// Whether to enable frosting (blur) effect. Enabling might affect page performance; if disabled, it will be semi-transparent.
			enableBlur: true,
			// Frosting blur degree
			blur: 10,
		},
		// Water ripple animation effect configuration. Enabling affects page performance.
		waves: {
			enable: {
				// Whether to enable water ripple animation on desktop
				desktop: true,
				// Whether to enable water ripple animation on mobile
				mobile: true,
			},
			// Whether to allow users to switch water ripple animation via the control panel
			switchable: true,
		},
	},
	// Full-screen transparent overlay mode specific configuration
	overlay: {
		// Whether to allow users to adjust full-screen transparent mode parameters via the control panel
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true,
		},
		// Z-index, ensures the wallpaper is in the background layer
		zIndex: -1,
		// Wallpaper opacity
		opacity: 0.8,
		// Background blur
		blur: 10,
		// Card opacity, between 0-1; smaller values are more transparent
		cardOpacity: 0.5,
	},
};
