import { h } from "hastscript";
import { visit } from "unist-util-visit";

const ADMONITION_TYPES = [
	"note",
	"tip",
	"important",
	"warning",
	"caution",
	"abstract",
	"summary",
	"tldr",
	"info",
	"todo",
	"success",
	"check",
	"done",
	"question",
	"help",
	"faq",
	"attention",
	"failure",
	"missing",
	"fail",
	"danger",
	"error",
	"bug",
	"example",
	"quote",
	"cite",
];

export function parseDirectiveNode() {
	return (tree) => {
		visit(tree, (node) => {
			if (
				node.type === "containerDirective" ||
				node.type === "leafDirective" ||
				node.type === "textDirective"
			) {
				const name = node.name ? node.name.toLowerCase() : "";

				// Check if it's an Admonition type
				// Only perform Admonition conversion for containerDirective
				if (
					node.type === "containerDirective" &&
					ADMONITION_TYPES.includes(name)
				) {
					const type = name.toUpperCase();

					// Handle label (custom title)
					const firstChild = node.children[0];
					if (firstChild?.data?.directiveLabel) {
						// If label exists, inject [!TYPE] to the start of the label
						if (
							firstChild.children.length > 0 &&
							firstChild.children[0].type === "text"
						) {
							firstChild.children[0].value = `[!${type}] ${firstChild.children[0].value}`;
						} else {
							firstChild.children.unshift({
								type: "text",
								value: `[!${type}] `,
							});
						}
					} else {
						// If no label, insert a new paragraph containing [!TYPE] as the first child node
						node.children.unshift({
							type: "paragraph",
							children: [{ type: "text", value: `[!${type}]` }],
						});
					}

					// Convert to Blockquote
					node.type = "blockquote";
					node.data = node.data || {};
					node.data.hName = "blockquote";
					// Key: Clear potential hProperties to prevent it from becoming a custom tag
					delete node.data.hProperties;
				} else {
					// Other Directives, keep original logic: convert to custom HTML tag
					const data = node.data || {};
					node.data = data;
					node.attributes = node.attributes || {};

					// Add specific attributes for directive labels
					if (
						node.children.length > 0 &&
						node.children[0].data &&
						node.children[0].data.directiveLabel
					) {
						node.attributes["has-directive-label"] = true;
					}

					const hast = h(node.name, node.attributes);
					data.hName = hast.tagName;
					data.hProperties = hast.properties;
				}
			}
		});
	};
}
