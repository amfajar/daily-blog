import { backgroundWallpaper } from "../config";

// Standardize single value or array into an array
const toArray = (src: string | string[] | undefined): string[] => {
	if (!src) return [];
	if (Array.isArray(src)) return src;
	return [src];
};

// Background image processing utilities
// Return all configured images (used for rendering during build)
export const getBackgroundImages = () => {
	const bgSrc = backgroundWallpaper.src;

	if (
		typeof bgSrc === "object" &&
		bgSrc !== null &&
		!Array.isArray(bgSrc) &&
		("desktop" in bgSrc || "mobile" in bgSrc)
	) {
		const srcObj = bgSrc as {
			desktop?: string | string[];
			mobile?: string | string[];
		};
		const desktopImages = toArray(srcObj.desktop);
		const mobileImages = toArray(srcObj.mobile);
		return {
			desktop: desktopImages.length > 0 ? desktopImages : mobileImages,
			mobile: mobileImages.length > 0 ? mobileImages : desktopImages,
			isMultiple: desktopImages.length > 1 || mobileImages.length > 1,
		};
	}
	// If it's a string or array, use it for both desktop and mobile
	const images = toArray(bgSrc as string | string[]);
	return {
		desktop: images,
		mobile: images,
		isMultiple: images.length > 1,
	};
};

// Type guard function
export const isBannerSrcObject = (
	src:
		| string
		| string[]
		| { desktop?: string | string[]; mobile?: string | string[] },
): src is { desktop?: string | string[]; mobile?: string | string[] } => {
	return (
		typeof src === "object" &&
		src !== null &&
		!Array.isArray(src) &&
		("desktop" in src || "mobile" in src)
	);
};

// Get default background image (first one, used for SEO etc.)
export const getDefaultBackground = (): string => {
	const images = getBackgroundImages();
	return images.desktop[0] || images.mobile[0] || "";
};

// Check if current page is the homepage
export const isHomePage = (pathname: string): boolean => {
	// Get base URL
	const baseUrl = import.meta.env.BASE_URL || "/";
	const baseUrlNoSlash = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

	if (pathname === baseUrl) return true;
	if (pathname === baseUrlNoSlash) return true;
	if (pathname === "/") return true;

	return false;
};

// Get banner offset based on position
export const getBannerOffset = (position = "center") => {
	const bannerOffsetByPosition = {
		top: "100vh",
		center: "50vh",
		bottom: "0",
	};
	return (
		bannerOffsetByPosition[position as keyof typeof bannerOffsetByPosition] ||
		"50vh"
	);
};
