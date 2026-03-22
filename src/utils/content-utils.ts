import { type CollectionEntry, getCollection } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl, slugify } from "@utils/url-utils";


// Helper to auto-assign category based on file ID (path)
function ensureCategory(post: CollectionEntry<"posts">) {
	// Normalize existing category if present, or detect from ID
	let cat = post.data.category?.trim() || "";

	// Detect from ID if empty or generic
	if (cat === "" || cat.toLowerCase() === "uncategorized") {
		const id = post.id.toLowerCase();
		if (id.includes("japanese")) cat = "Japanese";
		else if (id.includes("english")) cat = "English";
		else if (id.includes("komunikasi")) cat = "Komunikasi";
		else if (id.includes("problem solving") || id.includes("problem-solving"))
			cat = "Problem Solving";
		else if (id.includes("bi analyst") || id.includes("bi-analyst"))
			cat = "BI Analyst";
		else if (id.includes("journaling")) cat = "Journaling";
		else if (id.includes("intermezo")) cat = "Intermezo";
	}

	// Always normalize known categories to capitalized versions
	const lowerCat = cat.toLowerCase();
	if (lowerCat === "japanese") post.data.category = "Japanese";
	else if (lowerCat === "english") post.data.category = "English";
	else if (lowerCat === "komunikasi") post.data.category = "Komunikasi";
	else if (lowerCat === "problem solving" || lowerCat === "problem-solving")
		post.data.category = "Problem Solving";
	else if (lowerCat === "bi analyst" || lowerCat === "bi-analyst")
		post.data.category = "BI Analyst";
	else if (lowerCat === "journaling") post.data.category = "Journaling";
	else if (lowerCat === "intermezo") post.data.category = "Intermezo";
	else if (cat !== "") post.data.category = cat; // keep as-is if not on our list
}

// Retrieve posts and sort them by publication date
async function getRawSortedPosts() {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	// Ensure categories and titles are assigned by creating new objects
	const processedPosts = allBlogPosts.map((post) => {
		// Clone post and data to ensure mutability
		const updatedPost = {
			...post,
			data: { ...post.data },
		};

		ensureCategory(updatedPost);

		// Extract title from content if frontmatter title is generic "Untitled"
		if (updatedPost.data.title === "Untitled" && post.body) {
			// Match first # Heading or H1 style from post.body
			const match = post.body.match(/^#\s+(.+)$/m);
			let title = "";
			if (match) {
				title = match[1].trim();
				// Remove common markdown syntax from the title (bold, italic, code)
				title = title.replace(/(\*\*|__)(.*?)\1/g, "$2");
				title = title.replace(/(\*|_)(.*?)\1/g, "$2");
				title = title.replace(/`(.+?)`/g, "$1");
				updatedPost.data.title = title;
			} else {
				// If no H1 found, fallback to the file name without extension
				// post.id is usually the relative path from the collection root
                const fileName = post.id.split('/').pop() || "";
                const dotIndex = fileName.lastIndexOf('.');
				const basename = dotIndex === -1 ? fileName : fileName.substring(0, dotIndex);
				// Clean up prefixes like "2026-03-20 - " or "01. "
				updatedPost.data.title = basename.replace(/^(\d{4}-\d{2}-\d{2}\s*-\s*|\d{2}\.\s*)/, "");
			}
		}

		// Calculate slug from title
		updatedPost.data.slug = slugify(updatedPost.data.title);
		if (!updatedPost.data.slug) {
			// Fallback to ID if title is empty or non-slugifiable
			updatedPost.data.slug = post.id.replace(/\.[^/.]+$/, "").replace(/\//g, "-");
		}

		return updatedPost;
	});

	const sorted = processedPosts.sort((a, b) => {
		// First sort by pinned status, pinned posts first
		if (a.data.pinned && !b.data.pinned) return -1;
		if (!a.data.pinned && b.data.pinned) return 1;

		// If pinned status is the same, sort by publication date
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});
	return sorted;
}

export async function getSortedPosts() {
	const sorted = await getRawSortedPosts();

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = sorted[i - 1].data.slug;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].data.slug;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}
export type PostForList = {
	id: string;
	data: CollectionEntry<"posts">["data"];
};
export async function getSortedPostsList(): Promise<PostForList[]> {
	const sortedFullPosts = await getRawSortedPosts();

	// delete post.body
	const sortedPostsList = sortedFullPosts.map((post) => ({
		id: post.id,
		data: post.data,
	}));

	return sortedPostsList;
}
export type Tag = {
	name: string;
	count: number;
};

export async function getTagList(): Promise<Tag[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const countMap: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { tags: string[] } }) => {
		post.data.tags.forEach((tag: string) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});

	// sort tags
	const keys: string[] = Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return keys.map((key) => ({ name: key, count: countMap[key] }));
}

export type Category = {
	name: string;
	count: number;
	url: string;
};

export async function getCategoryList(): Promise<Category[]> {
	const allBlogPosts = await getRawSortedPosts();
	const count: { [key: string]: number } = {};
	allBlogPosts.forEach((post) => {
		// Category is already normalized by getRawSortedPosts which calls ensureCategory
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized);
			count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
			return;
		}

		const categoryName =
			typeof post.data.category === "string"
				? post.data.category.trim()
				: String(post.data.category).trim();

		count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
	});

	const lst = Object.keys(count).sort((a, b) => {
		return (
			count[b] - count[a] || a.toLowerCase().localeCompare(b.toLowerCase())
		);
	});

	const ret: Category[] = [];
	for (const c of lst) {
		ret.push({
			name: c,
			count: count[c],
			url: getCategoryUrl(c),
		});
	}
	return ret;
}

/**
 * Tokenize the title, supporting mixed Chinese and English
 * Use Intl.Segmenter for Chinese word segmentation, English by spaces
 * Filter punctuation and whitespace, lowercase English
 */
function tokenizeTitle(title: string): Set<string> {
	const tokens = new Set<string>();
	// Check if Intl.Segmenter is available (added in Node 14.5.0 / modern browsers)
	if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
		const segmenter = new (Intl as any).Segmenter("zh", { granularity: "word" });
		for (const { segment, isWordLike } of segmenter.segment(title)) {
			if (!isWordLike) continue;
			tokens.add(segment.toLowerCase());
		}
	} else {
		// Fallback for environments without Intl.Segmenter
		// Simple word segmentation: split by punctuation and whitespace
		const words = title.split(/[\s\p{P}]+/u);
		for (const word of words) {
			if (word.length > 0) tokens.add(word.toLowerCase());
		}
	}
	return tokens;
}

/**
 * Calculate Jaccard similarity between two sets
 */
function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
	if (a.size === 0 && b.size === 0) return 0;
	let intersection = 0;
	for (const item of a) {
		if (b.has(item)) intersection++;
	}
	const union = a.size + b.size - intersection;
	return union === 0 ? 0 : intersection / union;
}

/**
 * Get related post recommendations
 * Scoring formula: totalScore = tagMatchScore + titleSimilarityScore + timeFreshnessScore + categoryBonus
 * - tagMatchScore (0-100): Tag Jaccard similarity × 100
 * - titleSimilarityScore (0-100): Title token Jaccard similarity × 100
 * - timeFreshnessScore (0-30): 6 months half-life exponential decay
 * - categoryBonus (0 or 10): 10 points for same category
 */
export async function getRelatedPosts(
	currentPost: CollectionEntry<"posts">,
	maxCount = 5,
): Promise<PostForList[]> {
	const allPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	// Exclude self and encrypted posts
	const candidates = allPosts.filter(
		(p) => p.id !== currentPost.id && !p.data.password,
	);

	const currentTags = new Set(currentPost.data.tags || []);
	const currentTokens = tokenizeTitle(currentPost.data.title);
	const currentCategory = currentPost.data.category || "";
	const now = Date.now();

	const scored = candidates.map((post) => {
		const postTags = new Set(post.data.tags || []);

		// tagMatchScore (0-100)
		const tagMatchScore = jaccardSimilarity(currentTags, postTags) * 100;

		// titleSimilarityScore (0-100)
		const postTokens = tokenizeTitle(post.data.title);
		const titleSimilarityScore =
			jaccardSimilarity(currentTokens, postTokens) * 100;

		// timeFreshnessScore (0-30): 6 months half-life
		const daysSincePublished =
			(now - new Date(post.data.published).getTime()) / (1000 * 60 * 60 * 24);
		const timeFreshnessScore =
			30 * Math.exp((-Math.LN2 * daysSincePublished) / 180);

		// categoryBonus (0 or 10)
		const postCategory = post.data.category || "";
		const categoryBonus =
			currentCategory && postCategory && currentCategory === postCategory
				? 10
				: 0;

		const totalScore =
			tagMatchScore + titleSimilarityScore + timeFreshnessScore + categoryBonus;

		return {
			post,
			totalScore,
			tagMatchScore,
			timeFreshnessScore,
			categoryBonus,
		};
	});

	// Sort by total score in descending order
	scored.sort((a, b) => b.totalScore - a.totalScore);

	// Prioritize those with tag matches
	const withTagMatch = scored.filter((s) => s.tagMatchScore > 0);
	const withoutTagMatch = scored.filter((s) => s.tagMatchScore === 0);

	const result: PostForList[] = [];

	for (const s of withTagMatch) {
		if (result.length >= maxCount) break;
		result.push({ id: s.post.id, data: s.post.data });
	}

	// If count is less than maxCount, supplement with remaining candidates sorted by timeFreshnessScore + categoryBonus
	if (result.length < maxCount) {
		withoutTagMatch.sort(
			(a, b) =>
				b.timeFreshnessScore +
				b.categoryBonus -
				(a.timeFreshnessScore + a.categoryBonus),
		);
		for (const s of withoutTagMatch) {
			if (result.length >= maxCount) break;
			result.push({ id: s.post.id, data: s.post.data });
		}
	}

	return result;
}
