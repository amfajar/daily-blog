import { h } from "hastscript";
import { visit } from "unist-util-visit";

// From Kasuha: https://kasuha.com/posts/fuwari-enhance-ep1/

/**
 * Rehype plugin to encrypt mailto links to protect email addresses from crawlers
 *
 * @param {Object} options - Plugin options
 * @param {string} [options.method='base64'] - Encoding method: 'base64' or 'rot13'
 * @returns {Function} A transformer function for the rehype plugin
 */
export default function rehypeEmailProtection(options = {}) {
	const { method = "base64" } = options;

	// Base64 encoding function
	const base64Encode = (str) => {
		return btoa(str);
	};

	// ROT13 encoding function
	const rot13Encode = (str) => {
		return str.replace(/[a-zA-Z]/g, (char) => {
			const start = char <= "Z" ? 65 : 97;
			return String.fromCharCode(
				((char.charCodeAt(0) - start + 13) % 26) + start,
			);
		});
	};

	// Encode according to selected method
	const encode = (str) => {
		return method === "rot13" ? rot13Encode(str) : base64Encode(str);
	};

	// Generate decoding JavaScript code
	const generateDecodeScript = () => {
		if (method === "rot13") {
			return `
        function decodeRot13(str) {
          return str.replace(/[a-zA-Z]/g, function(char) {
            const start = char <= 'Z' ? 65 : 97;
            return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
          });
        }
        const decodedEmail = decodeRot13(encodedEmail);
      `;
		}
		return `
      const decodedEmail = atob(encodedEmail);
    `;
	};

	return (tree) => {
		let hasEmailLinks = false;

		visit(tree, "element", (node, index, parent) => {
			// Only process a elements
			if (node.tagName !== "a") {
				return;
			}

			// Check if it's a mailto link
			const href = node.properties?.href;
			if (!href || !href.startsWith("mailto:")) {
				return;
			}

			hasEmailLinks = true;

			// Extract email address
			const email = href.replace("mailto:", "");
			const encodedEmail = encode(email);

			// Create encrypted link element (remove original href attribute to avoid duplicates)
			const otherProperties = { ...node.properties };
			delete otherProperties.href;
			const protectedLink = h(
				"a",
				{
					...otherProperties,
					href: "#",
					"data-encoded-email": encodedEmail,
					onclick: `
          (function() {
            const encodedEmail = this.getAttribute('data-encoded-email');
            ${generateDecodeScript()}
            this.href = 'mailto:' + decodedEmail;
            this.removeAttribute('data-encoded-email');
            this.removeAttribute('onclick');
            this.click();
            return false;
          }).call(this);
        `
						.replace(/\s+/g, " ")
						.trim(),
				},
				node.children,
			);

			// Replace current a node
			if (parent && typeof index === "number") {
				parent.children[index] = protectedLink;
			}
		});

		// Add styles if there are email links on the page
		if (hasEmailLinks) {
			visit(tree, "element", (node) => {
				if (node.tagName === "head") {
					const style = h(
						"style",
						`
            a[data-encoded-email] {
              cursor: pointer;
              text-decoration: underline;
              color: inherit;
            }
            a[data-encoded-email]:hover {
              text-decoration: underline;
            }
          `.trim(),
					);
					node.children.push(style);
				}
			});
		}
	};
}
