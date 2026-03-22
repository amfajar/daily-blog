import { sidebarLayoutConfig } from "@/config";

export interface ResponsiveSidebarConfig {
	isBothSidebars: boolean;
	hasLeftComponents: boolean;
	hasRightComponents: boolean;
	mobileShowSidebar: boolean;
	tabletShowSidebar: boolean;
	desktopShowSidebar: boolean;
	position: "left" | "right" | "both";
	tabletSidebar: "left" | "right";
}

/**
 * Get responsive sidebar configuration
 *
 * Responsive layout (hard-coded):
 * - 768px and below: Hide sidebars, show mobileBottomComponents
 * - 769px-1279px: Show sidebar based on position and tabletSidebar config
 * - 1280px and above: Show sidebar based on position config
 */
export function getResponsiveSidebarConfig(): ResponsiveSidebarConfig {
	const position = sidebarLayoutConfig.position;
	const tabletSidebar = sidebarLayoutConfig.tabletSidebar ?? "left";

	const isBothSidebars = sidebarLayoutConfig.enable && position === "both";

	// If position is right, left components are not included in layout calculation
	const hasLeftComponents =
		sidebarLayoutConfig.enable &&
		position !== "right" &&
		sidebarLayoutConfig.leftComponents.some((comp) => comp.enable);

	// If position is left, right components are not included in layout calculation (even if enabled they will be hidden by CSS)
	const hasRightComponents =
		sidebarLayoutConfig.enable &&
		position !== "left" &&
		sidebarLayoutConfig.rightComponents.some((comp) => comp.enable);

	// Responsive layout is handled by CSS, here only used to determine if components exist
	const mobileShowSidebar = false; // Do not show sidebar for 768px and below
	const tabletShowSidebar = sidebarLayoutConfig.enable; // Show for 769px and above
	const desktopShowSidebar = sidebarLayoutConfig.enable; // Show for 1280px and above

	return {
		isBothSidebars,
		hasLeftComponents,
		hasRightComponents,
		mobileShowSidebar,
		tabletShowSidebar,
		desktopShowSidebar,
		position,
		tabletSidebar,
	};
}

/**
 * Generate grid column CSS classes
 *
 * Responsive design:
 * - 768px and below: Single column layout (grid-cols-1), hide sidebars, show bottom components
 * - 769px-1279px: Determine 2-column layout direction based on position and tabletSidebar config
 * - 1280px and above: Determine 2 or 3-column layout based on position config
 */
export function generateGridClasses(config: ResponsiveSidebarConfig): {
	gridCols: string;
} {
	let gridCols = "grid-cols-1";

	if (
		config.isBothSidebars &&
		config.hasLeftComponents &&
		config.hasRightComponents
	) {
		// Dual sidebars
		if (config.tabletSidebar === "right") {
			// Tablet display: 769-1279px [Content + Right Sidebar], 1280px+ [Left + Main + Right]
			gridCols =
				"grid-cols-1 md:grid-cols-[1fr_17.5rem] xl:grid-cols-[17.5rem_1fr_17.5rem]";
		} else {
			// Tablet: Show left sidebar (default): 769-1279px [Left Sidebar+Content], 1280px+ [Left+Middle+Right]
			gridCols =
				"grid-cols-1 md:grid-cols-[17.5rem_1fr] xl:grid-cols-[17.5rem_1fr_17.5rem]";
		}
	} else if (config.hasLeftComponents && !config.hasRightComponents) {
		// Only left sidebar: 769px+ show left+center, 768-below single column
		gridCols = "grid-cols-1 md:grid-cols-[17.5rem_1fr]";
	} else if (!config.hasLeftComponents && config.hasRightComponents) {
		// Only right sidebar: 769px+ show center+right, 768-below single column
		gridCols = "grid-cols-1 md:grid-cols-[1fr_17.5rem]";
	}

	return { gridCols };
}

/**
 * Generate left sidebar container CSS classes
 */
export function generateSidebarClasses(
	config: ResponsiveSidebarConfig,
): string {
	const classes = [
		"mb-4",
		"hidden",
		"md:col-span-1",
		"md:max-w-70",
		"md:row-start-1",
		"md:row-end-3",
		"md:col-start-1",
		"onload-animation",
	];

	if (config.isBothSidebars && config.tabletSidebar === "right") {
		// Dual sidebars + tablet show right sidebar: left sidebar only shown on 1280px+
		classes.push("xl:block");
	} else {
		// Default: left sidebar shown on 769px+
		classes.push("md:block");
	}

	return classes.join(" ");
}

/**
 * Generate right sidebar CSS classes
 */
export function generateRightSidebarClasses(
	config: ResponsiveSidebarConfig,
): string {
	const classes = ["mb-4", "hidden", "onload-animation"];

	if (config.isBothSidebars && config.tabletSidebar === "right") {
		// Dual sidebars + tablet show right sidebar: 769px+ show right sidebar
		classes.push(
			"md:block",
			"md:row-start-1",
			"md:row-end-3",
			"md:col-span-1",
			"md:max-w-70",
			"md:col-start-2", // Table in the 2nd column
			"xl:col-start-3", // Desktop in the 3rd column
		);
	} else if (config.isBothSidebars) {
		// Dual sidebars + tablet show left sidebar (default): only shown on 1280px+
		classes.push(
			"xl:block",
			"xl:row-start-1",
			"xl:row-end-3",
			"xl:col-span-1",
			"xl:max-w-70",
			"xl:col-start-3",
		);
	} else if (config.position === "right") {
		// Right sidebar only mode (not dual sidebars): 769px+ show, in the 2nd column
		classes.push(
			"md:block",
			"md:row-start-1",
			"md:row-end-3",
			"md:col-span-1",
			"md:max-w-70",
			"md:col-start-2",
		);
	} else {
		// Other cases: only 1280px+ show
		classes.push(
			"xl:block",
			"xl:row-start-1",
			"xl:row-end-3",
			"xl:col-span-1",
			"xl:max-w-70",
			"xl:col-start-3",
		);
	}

	return classes.join(" ");
}

/**
 * Generate main content area CSS classes
 */
export function generateMainContentClasses(
	config: ResponsiveSidebarConfig,
): string {
	const classes = [
		"transition-main",
		// 768px and below: single column layout
		"col-span-1",
	];

	if (
		config.isBothSidebars &&
		config.hasLeftComponents &&
		config.hasRightComponents
	) {
		if (config.tabletSidebar === "right") {
			// Dual sidebars + tablet right sidebar: tablet content in 1st column, desktop content in 2nd column
			classes.push("md:col-span-1");
			classes.push("md:col-start-1");
			classes.push("xl:col-span-1");
			classes.push("xl:col-start-2");
			classes.push("xl:col-end-3");
		} else {
			// Dual sidebars + tablet left sidebar (default): content always in 2nd column
			classes.push("md:col-span-1");
			classes.push("md:col-start-2");
			classes.push("xl:col-span-1");
			classes.push("xl:col-start-2");
			classes.push("xl:col-end-3");
		}
	} else if (config.hasLeftComponents && !config.hasRightComponents) {
		// Only left sidebar: content in 2nd column
		classes.push("md:col-span-1");
		classes.push("md:col-start-2");
	} else if (!config.hasLeftComponents && config.hasRightComponents) {
		// Only right sidebar: content in 1st column
		classes.push("md:col-span-1");
		classes.push("md:col-start-1");
	} else {
		classes.push("col-span-1");
	}

	classes.push("min-w-0");
	classes.push("overflow-hidden");

	return classes.join(" ");
}
