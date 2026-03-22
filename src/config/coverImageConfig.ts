import type { CoverImageConfig } from "../types/config";

/**
 * Post cover image configuration
 *
 * enableInPost - Whether to show the cover image on the post detail page
 *
 * Random cover image instructions:
 * 1. Add image: "api" to the post's frontmatter to use the random image feature
 * 2. The system will try all configured APIs in order; if all fail, it uses the fallback image
 *
 * // Post Frontmatter Example:
 * ---
 * title: Post Title
 * image: "api"
 * ---
 */
export const coverImageConfig: CoverImageConfig = {
	// Whether to show the cover image on the post detail page
	enableInPost: true,

	randomCoverImage: {
		// Random cover image feature toggle
		enable: false,
		// List of cover image APIs
		apis: [
			"https://t.alcy.cc/pc",
			"https://www.dmoe.cc/random.php",
			"https://uapis.cn/api/v1/random/image?category=acg&type=pc",
		],
		// Fallback image path (relative to src directory or starting with / for public directory) when API fails
		fallback: "assets/images/cover.avif",
		// Whether to show loading animation
		showLoading: false,
	},
};
