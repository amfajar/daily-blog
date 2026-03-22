import { h } from "hastscript";
import { visit } from "unist-util-visit";
import { shouldAddNoReferrer } from "../utils/image-utils.ts";

/**
 * Rehype plugin to convert images with alt text into figure elements containing figcaption
 *
 * @returns {Function} A transformer function for the rehype plugin
 */
export default function rehypeFigure() {
	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			// Only process img elements
			if (node.tagName !== "img") {
				return;
			}

			const imgProps = { ...node.properties };

			// Add referrerpolicy (if needed) to resolve 403 issues
			// Check and add referrerpolicy regardless of alt presence
			if (imgProps.src && shouldAddNoReferrer(imgProps.src)) {
				imgProps.referrerpolicy = "no-referrer";
			}

			// Get alt attribute
			const alt = imgProps.alt;

			// If no alt attribute or alt is empty, only update attributes and keep as is
			if (!alt || alt.trim() === "") {
				node.properties = imgProps;
				return;
			}

			// Create figure element containing processed img and centered figcaption
			const figure = h("figure", [
				// Use img node with original attributes
				h("img", {
					...imgProps,
				}),
				h("figcaption", alt),
			]);

			// Center display
			const centerFigure = h("center", figure);

			// Replace current img node with figure node
			if (parent && typeof index === "number") {
				parent.children[index] = centerFigure;
			}
		});
	};
}
