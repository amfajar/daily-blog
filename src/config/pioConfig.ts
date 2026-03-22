import type { Live2DModelConfig, SpineModelConfig } from "../types/config";

// Spine mascot configuration
export const spineModelConfig: SpineModelConfig = {
	// Spine mascot switch
	enable: false,

	// Spine model configuration
	model: {
		// Spine model file path
		path: "/pio/models/spine/firefly/1310.json",
		// Model scale ratio
		scale: 1.0,
		// X-axis offset
		x: 0,
		// Y-axis offset
		y: 0,
	},

	// Position configuration
	position: {
		// Display position: bottom-left, bottom-right, top-left, top-right. 
		// Note: Being in the bottom-right might block the 'Back to Top' button.
		corner: "bottom-left",
		// Distance from the edge: 0px
		offsetX: 0,
		// Distance from the bottom edge: 0px
		offsetY: 0,
	},

	// Size configuration
	size: {
		// Container width
		width: 135,
		// Container height
		height: 165,
	},

	// Interaction configuration
	interactive: {
		// Interaction switch
		enabled: true,
		// List of animations to play randomly on click
		clickAnimations: [
			"emoji_0",
			"emoji_1",
			"emoji_2",
			"emoji_3",
			"emoji_4",
			"emoji_5",
			"emoji_6",
			"emoji_7",
		],
		// Text messages to display randomly on click
		clickMessages: [
			"Hello! I'm Firefly~",
			"Good luck today! ✨",
			"Want to go see the stars together? 🌟",
			"Remember to take a good rest~",
			"Is there anything you want to tell me? 💫",
			"Let's explore the unknown world together! 🚀",
			"Every star has its own story~ ⭐",
			"I hope I can bring you warmth and happiness! 💖",
		],
		// Message display duration (ms)
		messageDisplayTime: 3000,
		// list of idle animations
		idleAnimations: ["idle", "emoji_0", "emoji_1", "emoji_3", "emoji_4"],
		// Idle animation switch interval (ms)
		idleInterval: 8000,
	},

	// Responsive configuration
	responsive: {
		// Hide on mobile devices
		hideOnMobile: true,
		// Mobile breakpoint
		mobileBreakpoint: 768,
	},

	// Z-index
	zIndex: 1000,

	// Opacity
	opacity: 1.0,
};

// Live2D mascot configuration
export const live2dModelConfig: Live2DModelConfig = {
	// Live2D mascot switch
	enable: false,
	// Live2D model configuration
	model: {
		// Live2D model file path
		path: "/pio/models/live2d/snow_miku/model.json",
		// path: "/pio/models/live2d/illyasviel/illyasviel.model.json",
	},

	// Position configuration
	position: {
		// Display position: bottom-left, bottom-right, top-left, top-right. 
		// Note: Being in the bottom-right might block the 'Back to Top' button.
		corner: "bottom-left",
		// Distance from the edge: 0px
		offsetX: 0,
		// Distance from the bottom edge: 0px
		offsetY: 0,
	},

	// Size configuration
	size: {
		// Container width
		width: 135,
		// Container height
		height: 165,
	},

	// Interaction configuration
	interactive: {
		// Interaction switch
		enabled: true,
		// Text messages to display randomly on click; motions and expressions are auto-read from the model JSON
		clickMessages: [
			"Hello! I'm Miku~",
			"Is there anything I can help you with?",
			"The weather is really nice today!",
			"Want to play a game together?",
			"Remember to rest on time!",
		],
		// Random text message display duration (ms)
		messageDisplayTime: 3000,
	},

	// Responsive configuration
	responsive: {
		// Hide on mobile devices
		hideOnMobile: true,
		// Mobile breakpoint
		mobileBreakpoint: 768,
	},
};
