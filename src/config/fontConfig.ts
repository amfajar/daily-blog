// Font configuration
export const fontConfig = {
	// Whether to enable custom font functionality
	enable: false,
	// Whether to preload font files
	preload: true,
	// Currently selected fonts, supports multiple font combinations
	selected: ["misans-regular"],

	// Font list
	// It's recommended to use font links provided by reliable CDN providers; they naturally handle on-demand sharding and perform well.
	//
	// You can also use local font files, but you need to handle font subsetting yourself. Otherwise, large font files will increase bandwidth burden, making page loading slow or even failing.
	// If font subsetting is performed, dynamic content (such as comments, Bangumi, etc.) will not display the font correctly; therefore, local font files are not recommended.
	fonts: {
		// System fonts
		system: {
			id: "system",
			name: "System Fonts",
			src: "", // System fonts do not need src
			family:
				"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
		},

		// Google Fonts - Zen Maru Gothic
		"zen-maru-gothic": {
			id: "zen-maru-gothic",
			name: "Zen Maru Gothic",
			src: "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap",
			family: "Zen Maru Gothic",
			display: "swap" as const,
		},

		// Google Fonts - Inter
		inter: {
			id: "inter",
			name: "Inter",
			src: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
			family: "Inter",
			display: "swap" as const,
		},

		// MiSans Normal
		"misans-normal": {
			id: "misans-normal",
			name: "MiSans Normal",
			src: "https://unpkg.com/misans@4.1.0/lib/Normal/MiSans-Normal.min.css",
			family: "MiSans",
			weight: 400,
			display: "swap" as const,
		},

		// MiSans Regular
		"misans-regular": {
			id: "misans-regular",
			name: "MiSans Regular",
			src: "https://unpkg.com/misans@4.1.0/lib/Normal/MiSans-Regular.min.css",
			family: "MiSans",
			weight: 500,
			display: "swap" as const,
		},

		// MiSans Semibold
		"misans-semibold": {
			id: "misans-semibold",
			name: "MiSans Semibold",
			src: "https://unpkg.com/misans@4.1.0/lib/Normal/MiSans-Semibold.min.css",
			family: "MiSans",
			weight: 600,
			display: "swap" as const,
		},
	},

	// Global font fallback
	fallback: [
		"system-ui",
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"sans-serif",
	],
};
