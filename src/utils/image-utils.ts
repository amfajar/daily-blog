import { coverImageConfig } from "../config/coverImageConfig";
import { siteConfig } from "../config/siteConfig";
import type { ImageFormat } from "../types/config";

const { randomCoverImage } = coverImageConfig;

/**
 * Generate a deterministic hash value based on a seed
 */
function getSeedHash(seed?: string): number {
	return seed
		? Math.abs(
				seed.split("").reduce((acc, char) => {
					return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
				}, 0),
			)
		: 0;
}

/**
 * Add a seed parameter to the API URL to ensure different images for each post
 */
function appendSeedParam(apiUrl: string, hash: number): string {
	if (hash === 0) return apiUrl;
	const separator = apiUrl.includes("?") ? "&" : "?";
	return `${apiUrl}${separator}v=${hash}`;
}

/**
 * Process post cover image
 * When the image field is "api", return the URL of the first API (client will try all APIs in order)
 * @param image - Value of the image field in the post frontmatter
 * @param seed - Seed used to generate a unique URL (post id or slug)
 */
export function processCoverImageSync(
	image: string | undefined,
	seed?: string,
): string {
	if (!image || image === "") {
		return "";
	}

	if (image !== "api") {
		return image;
	}

	if (
		!randomCoverImage.enable ||
		!randomCoverImage.apis ||
		randomCoverImage.apis.length === 0
	) {
		return "";
	}

	// Always use the first API; if it fails, the client will try subsequent APIs in order
	const hash = getSeedHash(seed);
	return appendSeedParam(randomCoverImage.apis[0], hash);
}

/**
 * Get all random cover image API URL lists (with seed parameter)
 * Used by the client to try in order; first success is used, fallback image if all fail
 * @param image - Value of the image field in the post frontmatter
 * @param seed - Seed used to generate a unique URL (post id or slug)
 */
export function getApiUrlList(
	image: string | undefined,
	seed?: string,
): string[] {
	if (image !== "api" || !randomCoverImage.enable || !randomCoverImage.apis) {
		return [];
	}

	const hash = getSeedHash(seed);
	return randomCoverImage.apis.map((api) => appendSeedParam(api, hash));
}

/**
 * Get image optimization format configuration
 */
export function getImageFormats(): ImageFormat[] {
	const formatConfig = siteConfig.imageOptimization?.formats ?? "both";
	switch (formatConfig) {
		case "avif":
			return ["avif"];
		case "webp":
			return ["webp"];
		default:
			return ["avif", "webp"];
	}
}

/**
 * Get image optimization quality configuration
 */
export function getImageQuality(): number {
	return siteConfig.imageOptimization?.quality ?? 80;
}

/**
 * Get image fallback format
 */
export function getFallbackFormat(): "avif" | "webp" {
	const formatConfig = siteConfig.imageOptimization?.formats ?? "both";
	return formatConfig === "avif" ? "avif" : "webp";
}

/**
 * Check if referrerpolicy="no-referrer" should be added to the image to solve hotlinking 403 issues
 */
export function shouldAddNoReferrer(urlStr: string): boolean {
	if (!urlStr.startsWith("http")) return false;
	const domains = siteConfig.imageOptimization?.noReferrerDomains || [];
	if (domains.length === 0) return false;
	try {
		const hostname = new URL(urlStr).hostname;
		return domains.some((pattern) => {
			const regexPattern = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*");
			return new RegExp(`^${regexPattern}$`).test(hostname);
		});
	} catch {
		return false;
	}
}
