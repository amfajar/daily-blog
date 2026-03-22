import type { ExpressiveCodeConfig } from "../types/config";

/**
 * expressive-code configuration
 * @see https://expressive-code.com/
 * Restart the Astro dev server after modifying this configuration to see changes.
 */

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Dark theme (used in dark mode)
	darkTheme: "one-dark-pro",

	// Light theme (used in light mode)
	lightTheme: "one-light",

	// For more styles, refer to the expressive-code official documentation:
	// https://expressive-code.com/guides/themes/

	// Code block collapsible plugin configuration
	pluginCollapsible: {
		enable: true, // Enable collapsible functionality
		lineThreshold: 15, // Show collapse button when code exceeds 15 lines
		previewLines: 8, // Show the first 8 lines when collapsed
		defaultCollapsed: true, // Collapse long code blocks by default
	},

	// Language badge plugin configuration
	pluginLanguageBadge: {
		// Whether to enable the language badge plugin
		enable: false,
	},
};
