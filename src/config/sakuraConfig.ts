import type { SakuraConfig } from "../types/config";

export const sakuraConfig: SakuraConfig = {
	// Whether to enable the sakura effect
	enable: false,

	// Number of sakura petals
	sakuraNum: 21,

	// Limit for petals going out of bounds, -1 for infinite loop
	limitTimes: -1,

	// Sakura petal size
	size: {
		// Minimum size multiplier
		min: 0.5,
		// Maximum size multiplier
		max: 1.1,
	},

	// Sakura petal opacity
	opacity: {
		// Minimum opacity
		min: 0.3,
		// Maximum opacity
		max: 0.9,
	},

	// Sakura petal movement speed
	speed: {
		// Horizontal movement
		horizontal: {
			// Minimum horizontal speed
			min: -1.7,
			// Maximum horizontal speed
			max: -1.2,
		},
		// Vertical movement
		vertical: {
			// Minimum vertical speed
			min: 1.5,
			// Maximum vertical speed
			max: 2.2,
		},
		// Rotation speed
		rotation: 0.03,
		// Fade speed (should not be greater than min opacity)
		fadeSpeed: 0.03,
	},

	// Z-index, ensures sakura petals are shown on the correct layer
	zIndex: 100,
};
