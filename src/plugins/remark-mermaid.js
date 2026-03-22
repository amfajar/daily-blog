import { visit } from "unist-util-visit";

export function remarkMermaid() {
	return (tree) => {
		visit(tree, "code", (node) => {
			if (node.lang === "mermaid") {
				const code = node.value;
				// Convert mermaid code block to custom node type
				node.type = "mermaid";
				node.data = {
					hName: "div",
					hProperties: {
						className: ["mermaid-container"],
						"data-mermaid-code": code,
					},
					// MDX compatibility: Store code as child node to prevent MDX compiler from losing hProperties
					hChildren: [{ type: "text", value: code }],
				};
				// Clear value to prevent remark-rehype from treating it as plain text
				node.value = undefined;
			}
		});
	};
}
