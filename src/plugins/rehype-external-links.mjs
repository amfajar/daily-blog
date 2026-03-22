import { visit } from "unist-util-visit";

/**
 * Add target="_blank" and rel="noopener noreferrer" to external links in the article
 * Only process links starting with http:// or https:// that do not belong to this site
 *
 * @param {Object} options
 * @param {string} [options.siteUrl] - 站点URL，用于判断是否为内部链接
 * @returns {Function} rehype transformer
 */
export default function rehypeExternalLinks(options = {}) {
	const siteUrl = options.siteUrl || "";
	let siteHost = "";
	try {
		siteHost = new URL(siteUrl).host;
	} catch (_e) {
		/* ignore */
	}

	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "a") return;

			const href = node.properties?.href;
			if (typeof href !== "string") return;

			// Only process http/https absolute links
			if (!href.startsWith("http://") && !href.startsWith("https://")) return;

			// Skip internal links
			if (siteHost) {
				try {
					if (new URL(href).host === siteHost) return;
				} catch (_e) {
					/* ignore */
				}
			}

			node.properties.target = "_blank";
			node.properties.rel = "noopener noreferrer";
		});
	};
}
