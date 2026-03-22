import type { GalleryConfig } from "@/types/config";

// Gallery configuration
export const galleryConfig: GalleryConfig = {
	// Albums list
	albums: [
		// Supports jpg/png/webp/avif/gif formats
		// id: Unique identifier for the album (used for directory naming and URL path), e.g., id: "firefly-2026" corresponds to the public/gallery/firefly-2026/ directory.
		// cover: Manually specify the cover image (optional; if empty, cover.* files will be used, and if no cover.* file exists, the first image will be used as the cover).
		// name: Album name
		// description: Album description
		// location: Shooting location
		// date: Album date, format YYYY-MM-DD, used for sorting and display
		// tags: Album tags, used for categorization and filtering
		// Adding an entry here is equivalent to adding an album; remember to create the corresponding subdirectory in public/gallery/ and add images.
		{
			id: "firefly-2026",
			name: "Lovely Firefly",
			description: "The fire of the firefly rises from the dreamless long night, blooming in the final tomorrow.",
			location: "Honkai: Star Rail",
			date: "2026-01-01",
			tags: ["Honkai: Star Rail", "Firefly"],
		},
	],

	// Minimum waterfall column width (px); the browser auto-calculates the number of columns based on the container width. Default is 240.
	// Smaller values mean more columns; larger values mean fewer columns.
	columnWidth: 240,
};
