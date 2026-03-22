import { h } from "hastscript";
import { visit } from "unist-util-visit";
import mermaidRenderScript from "./mermaid-render-script.js?raw";

/**
 * Recursively extract all text content from the HAST node tree
 */
function extractText(node) {
	if (node.type === "text") return node.value || "";
	if (node.children) return node.children.map(extractText).join("");
	return "";
}

export function rehypeMermaid() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (
				node.tagName === "div" &&
				node.properties &&
				node.properties.className &&
				node.properties.className.includes("mermaid-container")
			) {
				// Prioritize using data-mermaid-code attribute, extract from child node text if empty (MDX compatible)
				let mermaidCode = node.properties["data-mermaid-code"] || "";
				if (!mermaidCode) {
					mermaidCode = extractText(node).trim();
				}
				const mermaidId = `mermaid-${Math.random().toString(36).slice(-6)}`;

				// Create Mermaid container
				const mermaidContainer = h(
					"div",
					{
						class: "mermaid-wrapper",
						id: mermaidId,
					},
					[
						h(
							"div",
							{
								class: "mermaid",
								"data-mermaid-code": mermaidCode,
							},
							mermaidCode,
						),
					],
				);

				// Create client-side rendering script
				const renderScript = h(
					"script",
					{
						type: "text/javascript",
					},
					mermaidRenderScript,
				);

				// Replace original node
				node.tagName = "div";
				node.properties = { class: "mermaid-diagram-container" };
				node.children = [mermaidContainer, renderScript];
			}
		});
	};
}
