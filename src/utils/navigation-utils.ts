import { url } from "@/utils/url-utils";
/**
 * Navigation utility functions
 * Provides unified page navigation with Swup support for seamless transitions
 */

/**
 * Navigates to a specific page
 * @param url Target page URL
 * @param options Navigation options
 */
export function navigateToPage(
	url: string,
	options?: {
		replace?: boolean;
		force?: boolean;
	},
): void {
	// Check if URL is valid
	if (!url || typeof url !== "string") {
		console.warn("navigateToPage: Invalid URL provided");
		return;
	}

	// Open external links in a new tab
	if (
		url.startsWith("http://") ||
		url.startsWith("https://") ||
		url.startsWith("//")
	) {
		window.open(url, "_blank");
		return;
	}

	// Smooth scroll for anchor links
	if (url.startsWith("#")) {
		const element = document.getElementById(url.slice(1));
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
		return;
	}

	// Check if Swup is available
	if (typeof window !== "undefined" && window.swup) {
		try {
			// Use Swup for seamless navigation
			if (options?.replace) {
				window.swup.navigate(url, { history: false });
			} else {
				window.swup.navigate(url);
			}
		} catch (error) {
			console.error("Swup navigation failed:", error);
			// Fallback to standard navigation if Swup fails
			fallbackNavigation(url, options);
		}
	} else {
		// Fallback when Swup is not available
		fallbackNavigation(url, options);
	}
}

/**
 * Fallback navigation function
 * Uses standard page navigation when Swup is unavailable
 */
function fallbackNavigation(
	url: string,
	options?: {
		replace?: boolean;
		force?: boolean;
	},
): void {
	if (options?.replace) {
		window.location.replace(url);
	} else {
		window.location.href = url;
	}
}

/**
 * Check if Swup is ready
 */
export function isSwupReady(): boolean {
	return typeof window !== "undefined" && !!window.swup;
}

/**
 * Wait for Swup to be ready
 * @param timeout Timeout in milliseconds
 */
export function waitForSwup(timeout = 5000): Promise<boolean> {
	return new Promise((resolve) => {
		if (isSwupReady()) {
			resolve(true);
			return;
		}

		let timeoutId: NodeJS.Timeout;

		const checkSwup = () => {
			if (isSwupReady()) {
				clearTimeout(timeoutId);
				document.removeEventListener("swup:enable", checkSwup);
				resolve(true);
			}
		};

		// Listen for Swup enable event
		document.addEventListener("swup:enable", checkSwup);

		// Set timeout
		timeoutId = setTimeout(() => {
			document.removeEventListener("swup:enable", checkSwup);
			resolve(false);
		}, timeout);
	});
}

/**
 * Preload a page
 * @param url URL to preload
 */
export function preloadPage(url: string): void {
	if (!url || typeof url !== "string") {
		return;
	}

	// Use Swup preloading if available
	if (isSwupReady() && window.swup.preload) {
		try {
			window.swup.preload(url);
		} catch (error) {
			console.warn("Failed to preload page:", error);
		}
	}
}

/**
 * Get current page path
 */
export function getCurrentPath(): string {
	return typeof window !== "undefined" ? window.location.pathname : "";
}

/**
 * Check if current page is the homepage
 */
export function isHomePage(): boolean {
	const path = getCurrentPath();
	return path === url("/") || path === url("");
}

/**
 * Check if current page is a post page
 */
export function isPostPage(): boolean {
	const path = getCurrentPath();
	return path.startsWith(url("/posts/"));
}

/**
 * Compare if two paths are equal
 */
export function pathsEqual(path1: string, path2: string): boolean {
	// Normalize paths by removing trailing slashes
	const normalize = (path: string) => {
		return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
	};

	return normalize(path1) === normalize(path2);
}
