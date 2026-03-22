import {
	BANNER_HEIGHT_EXTEND,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
	SYSTEM_MODE,
	WALLPAPER_BANNER,
	WALLPAPER_NONE,
	WALLPAPER_OVERLAY,
} from "@constants/constants";
import type { LIGHT_DARK_MODE, WALLPAPER_MODE } from "@/types/config";
import {
	backgroundWallpaper,
	expressiveCodeConfig,
	siteConfig,
} from "../config";
import { isHomePage as checkIsHomePage } from "./layout-utils";

// Declare global functions
declare global {
	interface Window {
		initSemifullScrollDetection?: () => void;
		semifullScrollHandler?: () => void;
	}
}

export function getDefaultHue(): number {
	const fallback = "250";
	// Check if in browser environment
	if (typeof document === "undefined") {
		return Number.parseInt(fallback, 10);
	}
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}

export function getDefaultTheme(): LIGHT_DARK_MODE {
	// If defaultMode is set in the config file, use the configured value
	// Otherwise use DEFAULT_THEME (for backward compatibility)
	return siteConfig.themeColor.defaultMode ?? DEFAULT_THEME;
}

// Get system theme
export function getSystemTheme(): LIGHT_DARK_MODE {
	if (typeof window === "undefined") {
		return LIGHT_MODE;
	}
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? DARK_MODE
		: LIGHT_MODE;
}

// Resolve theme (if system mode, get system theme)
export function resolveTheme(theme: LIGHT_DARK_MODE): LIGHT_DARK_MODE {
	if (theme === SYSTEM_MODE) {
		return getSystemTheme();
	}
	return theme;
}

export function getHue(): number {
	// Check global object first
	if (typeof window === "undefined" || !window.localStorage) {
		return getDefaultHue();
	}
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	// Check if in browser environment first
	if (
		typeof window === "undefined" ||
		!window.localStorage ||
		typeof document === "undefined"
	) {
		return;
	}
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	// Check if in browser environment
	if (typeof document === "undefined") {
		return;
	}

	// Resolve theme
	const resolvedTheme = resolveTheme(theme);

	// Get full information of the current theme state
	const currentIsDark = document.documentElement.classList.contains("dark");
	const currentTheme = document.documentElement.getAttribute("data-theme");

	// Calculate target theme state
	let targetIsDark = false; // Initialize default value
	switch (resolvedTheme) {
		case LIGHT_MODE:
			targetIsDark = false;
			break;
		case DARK_MODE:
			targetIsDark = true;
			break;
		default:
		// Handle default case, use current theme state
			targetIsDark = currentIsDark;
			break;
	}

	// Detect if theme switch is actually needed:
	// 1. Whether the dark class state has changed
	// 2. Whether the expressiveCode theme needs updating
	const needsThemeChange = currentIsDark !== targetIsDark;
	const expectedTheme = targetIsDark
		? expressiveCodeConfig.darkTheme
		: expressiveCodeConfig.lightTheme;
	const needsCodeThemeUpdate = currentTheme !== expectedTheme;

	// If neither theme switch nor code theme update is needed, return directly
	if (!needsThemeChange && !needsCodeThemeUpdate) {
		return;
	}

	// Batch DOM operations to reduce reflows
	if (needsThemeChange) {
		// Add transition protection class (but it causes a lot of reflow, so use a more lightweight way)
		// document.documentElement.classList.add("is-theme-transitioning");

		// Switch theme directly, use CSS variable features for browser-optimized transitions
		if (targetIsDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}

	// Set the theme for Expressive Code based on current mode
	if (needsCodeThemeUpdate) {
		document.documentElement.setAttribute("data-theme", expectedTheme);
	}
}

// System theme listener reference
let systemThemeListener:
	| ((e: MediaQueryListEvent | MediaQueryList) => void)
	| null = null;

export function setTheme(theme: LIGHT_DARK_MODE): void {
	// Check if in browser environment
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.setItem !== "function"
	) {
		return;
	}

	// Apply theme first
	applyThemeToDocument(theme);

	// Save to localStorage
	localStorage.setItem("theme", theme);

	// If switching to system mode, need to listen for system theme changes
	if (theme === SYSTEM_MODE) {
		setupSystemThemeListener();
	} else {
		// If switching to other modes, remove system theme listener
		cleanupSystemThemeListener();
	}
}

// Set system theme listener
export function setupSystemThemeListener() {
	// Clean up previous listener first
	cleanupSystemThemeListener();

	if (typeof window === "undefined") {
		return;
	}

	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

	// Handle callback for system theme changes
	const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
		const isDark = e.matches;
		const currentIsDark = document.documentElement.classList.contains("dark");

		// If theme state has not changed, return directly
		if (currentIsDark === isDark) {
			return;
		}

		// Apply system theme directly, avoiding transition protection classes to prevent heavy reflow
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		// Set the theme for Expressive Code
		const expressiveTheme = isDark
			? expressiveCodeConfig.darkTheme
			: expressiveCodeConfig.lightTheme;
		document.documentElement.setAttribute("data-theme", expressiveTheme);

		// Trigger custom event to notify other components (only when actually switching)
		window.dispatchEvent(new CustomEvent("theme-change"));
	};

	// Call once immediately to set initial state
	handleSystemThemeChange(mediaQuery);

	// Listen for system theme changes (modern browsers)
	if (mediaQuery.addEventListener) {
		mediaQuery.addEventListener("change", handleSystemThemeChange);
	} else {
		// Compatibility for old browsers
		mediaQuery.addListener(handleSystemThemeChange);
	}

	systemThemeListener = handleSystemThemeChange;
}

// Clean up system theme listener
function cleanupSystemThemeListener() {
	if (typeof window === "undefined" || !systemThemeListener) {
		return;
	}

	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

	if (mediaQuery.removeEventListener) {
		mediaQuery.removeEventListener("change", systemThemeListener);
	} else {
		// Compatibility for old browsers
		mediaQuery.removeListener(systemThemeListener);
	}

	systemThemeListener = null;
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	// Check if in browser environment
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.getItem !== "function"
	) {
		return getDefaultTheme();
	}
	return (
		(localStorage.getItem("theme") as LIGHT_DARK_MODE) || getDefaultTheme()
	);
}

// Initialize theme listener (for use after page load)
export function initThemeListener() {
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.getItem !== "function"
	) {
		return;
	}

	const theme = getStoredTheme();

	// If theme is in system mode, need to listen for system theme changes
	if (theme === SYSTEM_MODE) {
		setupSystemThemeListener();
	}
}

// Wallpaper mode functions
export function applyWallpaperModeToDocument(mode: WALLPAPER_MODE) {
	// Check if wallpaper mode switching is allowed
	const isSwitchable = backgroundWallpaper.switchable ?? true;
	if (!isSwitchable) {
		// If switching is not allowed, return directly without any action
		return;
	}

	// Get current wallpaper mode
	const currentMode =
		(document.documentElement.getAttribute(
			"data-wallpaper-mode",
		) as WALLPAPER_MODE) || backgroundWallpaper.mode;

	// If mode hasn't changed, return directly
	if (currentMode === mode) {
		// Ensure UI state is correct even for the same mode
		ensureWallpaperState(mode);
		return;
	}

	// Add transition protection class
	document.documentElement.classList.add("is-wallpaper-transitioning");

	// Update data attribute
	document.documentElement.setAttribute("data-wallpaper-mode", mode);

	// Use requestAnimationFrame to execute on the next frame to avoid flashing screens
	requestAnimationFrame(() => {
		const body = document.body;

		// Remove all wallpaper-related CSS classes
		body.classList.remove(
			"enable-banner",
			"wallpaper-transparent",
			"no-banner-layout",
		);

		// Add corresponding CSS classes based on mode
		switch (mode) {
			case WALLPAPER_BANNER:
				body.classList.add("enable-banner");
				showBannerMode();
				break;
			case WALLPAPER_OVERLAY:
				body.classList.add("wallpaper-transparent");
				body.classList.add("no-banner-layout");
				showOverlayMode();
				break;
			case WALLPAPER_NONE:
				body.classList.add("no-banner-layout");
				hideAllWallpapers();
				break;
			default:
				body.classList.add("no-banner-layout");
				hideAllWallpapers();
				break;
		}

		// Update navbar transparency mode
		updateNavbarTransparency(mode);

		// Remove transition protection class on next frame
		requestAnimationFrame(() => {
			document.documentElement.classList.remove("is-wallpaper-transitioning");
		});
	});
}

// Ensure wallpaper state is correct
function ensureWallpaperState(mode: WALLPAPER_MODE) {
	const body = document.body;

	// Remove all wallpaper-related CSS classes
	body.classList.remove(
		"enable-banner",
		"wallpaper-transparent",
		"no-banner-layout",
	);

	// Add corresponding CSS classes based on mode
	switch (mode) {
		case WALLPAPER_BANNER:
			body.classList.add("enable-banner");
			showBannerMode();
			break;
		case WALLPAPER_OVERLAY:
			body.classList.add("wallpaper-transparent");
			body.classList.add("no-banner-layout");
			showOverlayMode();
			break;
		case WALLPAPER_NONE:
			body.classList.add("no-banner-layout");
			hideAllWallpapers();
			break;
	}

	// Update navbar transparency mode
	updateNavbarTransparency(mode);
}

function showBannerMode() {
	// Show wallpaper-wrapper and switch to banner mode
	const wallpaperWrapper = document.getElementById("wallpaper-wrapper");
	if (wallpaperWrapper) {
		// Remove overlay mode class
		wallpaperWrapper.classList.remove("wallpaper-overlay");

		// Restore top positioning for banner mode
		wallpaperWrapper.style.top = `-${BANNER_HEIGHT_EXTEND}vh`;

		// Check if current page is homepage
		const isHomePage = checkIsHomePage(window.location.pathname);
		const isMobile = window.innerWidth < 1024;

		// On mobile non-homepage, do not show banner; desktop always shows
		if (isMobile && !isHomePage) {
			wallpaperWrapper.style.display = "none";
			wallpaperWrapper.classList.add("mobile-hide-banner");
		} else {
			// Homepage or desktop: set display first, then use requestAnimationFrame to ensure rendering
			wallpaperWrapper.style.display = "block";
			wallpaperWrapper.style.setProperty("display", "block", "important");
			requestAnimationFrame(() => {
				wallpaperWrapper.classList.remove("hidden");
				wallpaperWrapper.classList.remove("opacity-0");
				wallpaperWrapper.classList.add("opacity-100");
				wallpaperWrapper.classList.remove("mobile-hide-banner");
			});
		}
	}

	// Show banner image source text
	const creditDesktop = document.getElementById("banner-credit-desktop");
	const creditMobile = document.getElementById("banner-credit-mobile");
	if (creditDesktop) creditDesktop.style.display = "";
	if (creditMobile) creditMobile.style.display = "";

	// Show banner home text (if enabled and on homepage)
	const bannerTextOverlay = document.querySelector(".banner-home-text-overlay");
	if (bannerTextOverlay) {
		// Check if homeText is enabled
		const homeTextEnabled = backgroundWallpaper.banner?.homeText?.enable;

		// Check if current page is homepage
		const isHomePage = checkIsHomePage(window.location.pathname);

		// Only show if enabled and on homepage
		if (homeTextEnabled && isHomePage) {
			bannerTextOverlay.classList.remove("hidden");
		} else {
			bannerTextOverlay.classList.add("hidden");
		}
	}

	// Adjust main content position
	adjustMainContentPosition("banner");

	// Handle main content area position for mobile non-homepage
	const mainContentWrapper = document.querySelector(".absolute.w-full.z-30");
	if (mainContentWrapper) {
		const isHomePage = checkIsHomePage(window.location.pathname);
		const isMobile = window.innerWidth < 1024;
		// Offset main content position only when not on homepage on mobile
		if (isMobile && !isHomePage) {
			mainContentWrapper.classList.add("mobile-main-no-banner");
		} else {
			mainContentWrapper.classList.remove("mobile-main-no-banner");
		}
	}

	// Remove transparency effect (banner mode doesn't use semi-transparent)
	adjustMainContentTransparency(false);

	// Adjust navbar transparency
	const navbar = document.getElementById("navbar");
	if (navbar) {
		// Get navbar transparency mode configuration (banner mode)
		const transparentMode =
			backgroundWallpaper.banner?.navbar?.transparentMode || "semi";
		navbar.setAttribute("data-transparent-mode", transparentMode);

		// Re-initialize scrolling detection for semi-transparent mode (if needed)
		if (
			transparentMode === "semifull" &&
			typeof window.initSemifullScrollDetection === "function"
		) {
			window.initSemifullScrollDetection();
		}
	}
}

function showOverlayMode() {
	// Switch wallpaper-wrapper to overlay mode
	const wallpaperWrapper = document.getElementById("wallpaper-wrapper");
	if (wallpaperWrapper) {
		// Add overlay mode class
		wallpaperWrapper.classList.add("wallpaper-overlay");
		// Show wallpaper
		wallpaperWrapper.style.display = "block";
		wallpaperWrapper.style.setProperty("display", "block", "important");
		wallpaperWrapper.style.top = "";
		requestAnimationFrame(() => {
			wallpaperWrapper.classList.remove("hidden");
			wallpaperWrapper.classList.remove("opacity-0");
			wallpaperWrapper.classList.add("opacity-100");
			wallpaperWrapper.classList.remove("mobile-hide-banner");
		});
	}

	// Hide banner image source text
	const creditDesktop = document.getElementById("banner-credit-desktop");
	const creditMobile = document.getElementById("banner-credit-mobile");
	if (creditDesktop) creditDesktop.style.display = "none";
	if (creditMobile) creditMobile.style.display = "none";

	// Hide banner homepage text
	const bannerTextOverlay = document.querySelector(".banner-home-text-overlay");
	if (bannerTextOverlay) {
		bannerTextOverlay.classList.add("hidden");
	}

	// Adjust main content transparency
	adjustMainContentTransparency(true);

	// Adjust layout to compact mode
	adjustMainContentPosition("overlay");
}

function hideAllWallpapers() {
	// Hide wallpaper
	const wallpaperWrapper = document.getElementById("wallpaper-wrapper");

	if (wallpaperWrapper) {
		wallpaperWrapper.style.display = "none";
		wallpaperWrapper.classList.add("hidden");
		wallpaperWrapper.classList.add("opacity-0");
		wallpaperWrapper.classList.remove("wallpaper-overlay");
	}

	// Hide banner image source text
	const creditDesktop = document.getElementById("banner-credit-desktop");
	const creditMobile = document.getElementById("banner-credit-mobile");
	if (creditDesktop) creditDesktop.style.display = "none";
	if (creditMobile) creditMobile.style.display = "none";

	// Hide banner homepage text
	const bannerTextOverlay = document.querySelector(".banner-home-text-overlay");
	if (bannerTextOverlay) {
		bannerTextOverlay.classList.add("hidden");
	}

	// Adjust main content position and transparency
	adjustMainContentPosition("none");
	adjustMainContentTransparency(false);
}

function updateNavbarTransparency(mode: WALLPAPER_MODE) {
	const navbar = document.getElementById("navbar");
	if (!navbar) return;

	let transparentMode: string;
	let enableBlur: boolean;

	// Set navbar transparency mode and blur effect based on current wallpaper mode
	if (mode === WALLPAPER_OVERLAY) {
		// Fullscreen wallpaper mode
		transparentMode = "none";
		enableBlur = false;
	} else if (mode === WALLPAPER_NONE) {
		// Pure color background mode
		transparentMode = "none";
		enableBlur = false;
	} else {
		// Banner mode: use configured transparency mode and blur effect
		transparentMode =
			backgroundWallpaper.banner?.navbar?.transparentMode || "semi";
		enableBlur = backgroundWallpaper.banner?.navbar?.enableBlur ?? true;
	}

	// Update navbar transparency mode attribute
	navbar.setAttribute("data-transparent-mode", transparentMode);
	navbar.setAttribute("data-enable-blur", String(enableBlur));

	// Remove existing transparency mode classes
	navbar.classList.remove(
		"navbar-transparent-semi",
		"navbar-transparent-full",
		"navbar-transparent-semifull",
	);

	// Remove scrolled class
	navbar.classList.remove("scrolled");

	// Scrolling detection functionality
	if (
		transparentMode === "semifull" &&
		mode === WALLPAPER_BANNER &&
		typeof window.initSemifullScrollDetection === "function"
	) {
		// Enable scroll detection only in Banner mode with semifull
		window.initSemifullScrollDetection();
	} else if (window.semifullScrollHandler) {
		// Remove scrolling listener
		window.removeEventListener("scroll", window.semifullScrollHandler);
		delete window.semifullScrollHandler;
	}
}

function adjustMainContentPosition(
	mode: WALLPAPER_MODE | "banner" | "none" | "overlay",
) {
	const mainContent = document.querySelector(
		".absolute.w-full.z-30",
	) as HTMLElement;
	if (!mainContent) return;

	// Remove existing position classes
	mainContent.classList.remove("mobile-main-no-banner", "no-banner-layout");

	switch (mode) {
		case "banner":
			// Banner mode: main content below banner
			mainContent.style.top = "calc(var(--banner-height) - 3rem)";
			break;
		case "overlay":
			// Overlay mode: use compact layout, main content starts below navbar
			mainContent.classList.add("no-banner-layout");
			mainContent.style.top = "5.5rem";
			break;
		case "none":
			// No wallpaper mode: main content starts below navbar
			mainContent.classList.add("no-banner-layout");
			mainContent.style.top = "5.5rem";
			break;
		default:
			mainContent.style.top = "5.5rem";
			break;
	}
}

function adjustMainContentTransparency(enable: boolean) {
	const mainContent = document.querySelector(".absolute.w-full.z-30");
	const body = document.body;

	if (!mainContent || !body) return;

	if (enable) {
		mainContent.classList.add("wallpaper-transparent");
		body.classList.add("wallpaper-transparent");
	} else {
		mainContent.classList.remove("wallpaper-transparent");
		body.classList.remove("wallpaper-transparent");
	}
}

export function setWallpaperMode(mode: WALLPAPER_MODE): void {
	// Check if in browser environment
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.setItem !== "function"
	) {
		return;
	}
	localStorage.setItem("wallpaperMode", mode);
	applyWallpaperModeToDocument(mode);
}

export function initWallpaperMode(): void {
	// Initialize transparency mode parameters (opacity/blur/card transparency)
	applyStoredOverlaySettingsToDocument();
	const storedMode = getStoredWallpaperMode();
	applyWallpaperModeToDocument(storedMode);
}

export function getStoredWallpaperMode(): WALLPAPER_MODE {
	// Check if in browser environment
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.getItem !== "function"
	) {
		return backgroundWallpaper.mode;
	}
	return (
		(localStorage.getItem("wallpaperMode") as WALLPAPER_MODE) ||
		backgroundWallpaper.mode
	);
}

// Overlay settings functions
function clampNumber(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

export function getDefaultOverlayOpacity(): number {
	return backgroundWallpaper.overlay?.opacity ?? 0.8;
}

export function getDefaultOverlayBlur(): number {
	return backgroundWallpaper.overlay?.blur ?? 0;
}

export function getDefaultOverlayCardOpacity(): number {
	return backgroundWallpaper.overlay?.cardOpacity ?? 0.6;
}

export function getStoredOverlayOpacity(): number {
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.getItem !== "function"
	) {
		return getDefaultOverlayOpacity();
	}
	const stored = localStorage.getItem("overlayOpacity");
	if (stored === null) {
		return getDefaultOverlayOpacity();
	}
	const parsed = Number.parseFloat(stored);
	if (Number.isNaN(parsed)) {
		return getDefaultOverlayOpacity();
	}
	return clampNumber(parsed, 0, 1);
}

export function getStoredOverlayBlur(): number {
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.getItem !== "function"
	) {
		return getDefaultOverlayBlur();
	}
	const stored = localStorage.getItem("overlayBlur");
	if (stored === null) {
		return getDefaultOverlayBlur();
	}
	const parsed = Number.parseFloat(stored);
	if (Number.isNaN(parsed)) {
		return getDefaultOverlayBlur();
	}
	return clampNumber(parsed, 0, 20);
}

export function getStoredOverlayCardOpacity(): number {
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.getItem !== "function"
	) {
		return getDefaultOverlayCardOpacity();
	}
	const stored = localStorage.getItem("overlayCardOpacity");
	if (stored === null) {
		return getDefaultOverlayCardOpacity();
	}
	const parsed = Number.parseFloat(stored);
	if (Number.isNaN(parsed)) {
		return getDefaultOverlayCardOpacity();
	}
	return clampNumber(parsed, 0, 1);
}

export function applyOverlayOpacityToDocument(opacity: number): void {
	if (typeof document === "undefined") {
		return;
	}
	const safeOpacity = clampNumber(opacity, 0, 1);
	const wallpaperWrapper = document.getElementById("wallpaper-wrapper");
	if (wallpaperWrapper) {
		wallpaperWrapper.style.setProperty(
			"--overlay-opacity",
			String(safeOpacity),
		);
	}
}

export function applyOverlayBlurToDocument(blur: number): void {
	if (typeof document === "undefined") {
		return;
	}
	const safeBlur = clampNumber(blur, 0, 20);
	const wallpaperWrapper = document.getElementById("wallpaper-wrapper");
	if (wallpaperWrapper) {
		wallpaperWrapper.style.setProperty("--overlay-blur", `${safeBlur}px`);
	}
}

export function applyOverlayCardOpacityToDocument(cardOpacity: number): void {
	if (typeof document === "undefined") {
		return;
	}
	const safeCardOpacity = clampNumber(cardOpacity, 0, 1);
	document.documentElement.style.setProperty(
		"--card-transparent-opacity",
		String(safeCardOpacity),
	);
}

export function setOverlayOpacity(opacity: number): void {
	const safeOpacity = clampNumber(opacity, 0, 1);
	if (
		typeof localStorage !== "undefined" &&
		typeof localStorage.setItem === "function"
	) {
		localStorage.setItem("overlayOpacity", String(safeOpacity));
	}
	applyOverlayOpacityToDocument(safeOpacity);
}

export function setOverlayBlur(blur: number): void {
	const safeBlur = clampNumber(blur, 0, 20);
	if (
		typeof localStorage !== "undefined" &&
		typeof localStorage.setItem === "function"
	) {
		localStorage.setItem("overlayBlur", String(safeBlur));
	}
	applyOverlayBlurToDocument(safeBlur);
}

export function setOverlayCardOpacity(cardOpacity: number): void {
	const safeCardOpacity = clampNumber(cardOpacity, 0, 1);
	if (
		typeof localStorage !== "undefined" &&
		typeof localStorage.setItem === "function"
	) {
		localStorage.setItem("overlayCardOpacity", String(safeCardOpacity));
	}
	applyOverlayCardOpacityToDocument(safeCardOpacity);
}

export function applyStoredOverlaySettingsToDocument(): void {
	applyOverlayOpacityToDocument(getStoredOverlayOpacity());
	applyOverlayBlurToDocument(getStoredOverlayBlur());
	applyOverlayCardOpacityToDocument(getStoredOverlayCardOpacity());
}

// Waves animation functions
export function getDefaultWavesEnabled(): boolean {
	const wavesConfig = backgroundWallpaper.banner?.waves?.enable;
	if (typeof wavesConfig === "object") {
		// If it is a per-device configuration, check the current device
		const isMobile =
			typeof window !== "undefined" ? window.innerWidth < 768 : false;
		return isMobile
			? (wavesConfig.mobile ?? false)
			: (wavesConfig.desktop ?? false);
	}
	return wavesConfig ?? false;
}

export function getStoredWavesEnabled(): boolean {
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.getItem !== "function"
	) {
		return getDefaultWavesEnabled();
	}
	const stored = localStorage.getItem("wavesEnabled");
	if (stored === null) {
		return getDefaultWavesEnabled();
	}
	return stored === "true";
}

export function setWavesEnabled(enabled: boolean): void {
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.setItem !== "function"
	) {
		return;
	}
	localStorage.setItem("wavesEnabled", String(enabled));
	applyWavesEnabledToDocument(enabled);
}

export function applyWavesEnabledToDocument(enabled: boolean): void {
	if (typeof document === "undefined") {
		return;
	}
	// Update html attribute, CSS will take effect immediately
	document.documentElement.setAttribute("data-waves-enabled", String(enabled));
	// Also update element style (compatibility)
	const wavesElement = document.getElementById("header-waves");
	if (wavesElement) {
		if (enabled) {
			wavesElement.style.display = "";
			wavesElement.classList.remove("waves-disabled");
		} else {
			wavesElement.style.display = "none";
			wavesElement.classList.add("waves-disabled");
		}
	}
}

// Banner title functions
export function getDefaultBannerTitleEnabled(): boolean {
	return backgroundWallpaper.banner?.homeText?.enable ?? true;
}

export function getStoredBannerTitleEnabled(): boolean {
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.getItem !== "function"
	) {
		return getDefaultBannerTitleEnabled();
	}
	const stored = localStorage.getItem("bannerTitleEnabled");
	if (stored === null) {
		return getDefaultBannerTitleEnabled();
	}
	return stored === "true";
}

export function setBannerTitleEnabled(enabled: boolean): void {
	if (
		typeof localStorage === "undefined" ||
		typeof localStorage.setItem !== "function"
	) {
		return;
	}
	localStorage.setItem("bannerTitleEnabled", String(enabled));
	applyBannerTitleEnabledToDocument(enabled);
}

export function applyBannerTitleEnabledToDocument(enabled: boolean): void {
	if (typeof document === "undefined") {
		return;
	}
	// Update html attribute, CSS will take effect immediately
	document.documentElement.setAttribute(
		"data-banner-title-enabled",
		String(enabled),
	);
	// Also update element style (compatibility)
	const bannerTextOverlay = document.querySelector(
		".banner-home-text-overlay",
	) as HTMLElement;
	if (bannerTextOverlay) {
		if (enabled) {
			bannerTextOverlay.classList.remove("user-hidden");
		} else {
			bannerTextOverlay.classList.add("user-hidden");
		}
	}
}
