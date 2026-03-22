(() => {
	// Singleton pattern: Check if already initialized
	if (window.mermaidInitialized) {
		return;
	}

	window.mermaidInitialized = true;

	// Record current theme state to avoid unnecessary re-rendering
	let currentTheme = null;
	let isRendering = false; // Prevent concurrent rendering
	let retryCount = 0;
	const MAX_RETRIES = 3;
	const RETRY_DELAY = 1000; // 1 second

	// Check if theme has actually changed
	function hasThemeChanged() {
		const isDark = document.documentElement.classList.contains("dark");
		const newTheme = isDark ? "dark" : "default";

		if (currentTheme !== newTheme) {
			currentTheme = newTheme;
			return true;
		}
		return false;
	}

	// Wait for Mermaid library to load
	function waitForMermaid(timeout = 10000) {
		return new Promise((resolve, reject) => {
			const startTime = Date.now();

			function check() {
				if (window.mermaid && typeof window.mermaid.initialize === "function") {
					resolve(window.mermaid);
				} else if (Date.now() - startTime > timeout) {
					reject(new Error("Mermaid library failed to load within timeout"));
				} else {
					setTimeout(check, 100);
				}
			}

			check();
		});
	}

	// Set up MutationObserver to listen for class attribute changes on the html element
	function setupMutationObserver() {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "class"
				) {
					// Check if it's a change to the 'dark' class
					const target = mutation.target;
					const wasDark = mutation.oldValue
						? mutation.oldValue.includes("dark")
						: false;
					const isDark = target.classList.contains("dark");

					if (wasDark !== isDark) {
						if (hasThemeChanged()) {
							// Delay rendering to avoid flickering during theme switching
							setTimeout(() => renderMermaidDiagrams(), 150);
						}
					}
				}
			});
		});

		// Start observing class attribute changes on the html element
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
			attributeOldValue: true,
		});
	}

	// Set up other event listeners
	function setupEventListeners() {
		// Listen for page navigation
		document.addEventListener("astro:page-load", () => {
			// Re-initialize theme state
			currentTheme = null;
			retryCount = 0; // Reset retry count
			if (hasThemeChanged()) {
				setTimeout(() => renderMermaidDiagrams(), 100);
			}
		});

		// Listen for page visibility changes, re-render when visible
		document.addEventListener("visibilitychange", () => {
			if (!document.hidden) {
				setTimeout(() => renderMermaidDiagrams(), 200);
			}
		});
	}

	async function initializeMermaid() {
		try {
			await waitForMermaid();

			// Initialize Mermaid configuration
			window.mermaid.initialize({
				startOnLoad: false,
				theme: "default",
				themeVariables: {
					fontFamily: "inherit",
					fontSize: "16px",
				},
				securityLevel: "loose",
				// Add error handling configuration
				errorLevel: "warn",
				logLevel: "error",
			});

			// Render all Mermaid diagrams
			await renderMermaidDiagrams();
		} catch (error) {
			console.error("Failed to initialize Mermaid:", error);
			// If initialization fails, try to reload
			if (retryCount < MAX_RETRIES) {
				retryCount++;
				setTimeout(() => initializeMermaid(), RETRY_DELAY * retryCount);
			}
		}
	}

	async function renderMermaidDiagrams() {
		// Prevent concurrent rendering
		if (isRendering) {
			return;
		}

		// 检查 Mermaid 是否可用
		if (!window.mermaid || typeof window.mermaid.render !== "function") {
			console.warn("Mermaid not available, skipping render");
			return;
		}

		isRendering = true;

		// Destroy old pan-zoom instances before theme switch
		destroyAllPanZoom();

		try {
			const mermaidElements = document.querySelectorAll(
				".mermaid[data-mermaid-code]",
			);

			if (mermaidElements.length === 0) {
				isRendering = false;
				return;
			}

			// Delay theme detection to ensure DOM is updated
			await new Promise((resolve) => setTimeout(resolve, 100));

			const htmlElement = document.documentElement;
			const isDark = htmlElement.classList.contains("dark");
			const theme = isDark ? "dark" : "default";

			// Update Mermaid theme (only needs to be updated once)
			window.mermaid.initialize({
				startOnLoad: false,
				theme: theme,
				themeVariables: {
					fontFamily: "inherit",
					fontSize: "16px",
					// Force apply theme variables
					primaryColor: isDark ? "#ffffff" : "#000000",
					primaryTextColor: isDark ? "#ffffff" : "#000000",
					primaryBorderColor: isDark ? "#ffffff" : "#000000",
					lineColor: isDark ? "#ffffff" : "#000000",
					secondaryColor: isDark ? "#333333" : "#f0f0f0",
					tertiaryColor: isDark ? "#555555" : "#e0e0e0",
				},
				securityLevel: "loose",
				errorLevel: "warn",
				logLevel: "error",
			});

			// Batch render all diagrams with retry mechanism
			const renderPromises = Array.from(mermaidElements).map(
				async (element, index) => {
					let attempts = 0;
					const maxAttempts = 3;

					while (attempts < maxAttempts) {
						try {
							const code = element.getAttribute("data-mermaid-code");

							if (!code) {
								break;
							}

							// Show loading state
							element.innerHTML =
								'<div class="mermaid-loading">Rendering diagram...</div>';

							// Render diagram
							const { svg } = await window.mermaid.render(
								`mermaid-${Date.now()}-${index}-${attempts}`,
								code,
							);

							element.innerHTML = svg;

							// Add responsive support
							const svgElement = element.querySelector("svg");
							if (svgElement) {
								svgElement.setAttribute("width", "100%");
								svgElement.removeAttribute("height");
								svgElement.style.maxWidth = "100%";
								svgElement.style.height = "auto";

								// Force apply styles
								if (isDark) {
									svgElement.style.filter = "brightness(0.9) contrast(1.1)";
								} else {
									svgElement.style.filter = "none";
								}
							}

							// Render successful, break retry loop
							break;
						} catch (error) {
							attempts++;
							console.warn(
								`Mermaid rendering attempt ${attempts} failed for element ${index}:`,
								error,
							);

							if (attempts >= maxAttempts) {
								console.error(
									`Failed to render Mermaid diagram after ${maxAttempts} attempts:`,
									error,
								);
								element.innerHTML = `
									<div class="mermaid-error">
										<p>Failed to render diagram after ${maxAttempts} attempts.</p>
										<button onclick="location.reload()" style="margin-top: 8px; padding: 4px 8px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer;">
											Retry Page
										</button>
									</div>
								`;
							} else {
								// Wait for a while and then retry
								await new Promise((resolve) =>
									setTimeout(resolve, 500 * attempts),
								);
							}
						}
					}
				},
			);

			// Wait for all rendering to complete
			await Promise.all(renderPromises);
			retryCount = 0; // Reset retry count

			// Initialize pan-zoom after rendering
			initPanZoom();
		} catch (error) {
			console.error("Error in renderMermaidDiagrams:", error);

			// If rendering fails, try re-rendering
			if (retryCount < MAX_RETRIES) {
				retryCount++;
				setTimeout(() => renderMermaidDiagrams(), RETRY_DELAY * retryCount);
			}
		} finally {
			isRendering = false;
		}
	}

	// Initialize theme state
	function initializeThemeState() {
		const isDark = document.documentElement.classList.contains("dark");
		currentTheme = isDark ? "dark" : "default";
	}

	// Load Mermaid library
	async function loadMermaid() {
		if (typeof window.mermaid !== "undefined") {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src =
				"https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.12.0/mermaid.min.js";

			script.onload = () => {
				console.log("Mermaid library loaded successfully");
				resolve();
			};

			script.onerror = (error) => {
				console.error("Failed to load Mermaid library:", error);
				// Try fallback CDN
				const fallbackScript = document.createElement("script");
				fallbackScript.src =
					"https://unpkg.com/mermaid@11.12.0/dist/mermaid.min.js";

				fallbackScript.onload = () => {
					console.log("Mermaid library loaded from fallback CDN");
					resolve();
				};

				fallbackScript.onerror = () => {
					reject(
						new Error(
							"Failed to load Mermaid from both primary and fallback CDNs",
						),
					);
				};

				document.head.appendChild(fallbackScript);
			};

			document.head.appendChild(script);
		});
	}

	// Load svg-pan-zoom library
	async function loadSvgPanZoom() {
		if (typeof window.svgPanZoom !== "undefined") {
			return Promise.resolve();
		}

		return new Promise((resolve, _reject) => {
			const script = document.createElement("script");
			script.src =
				"https://unpkg.com/svg-pan-zoom@3.6.2/dist/svg-pan-zoom.min.js";
			script.onload = () => {
				resolve();
			};

			script.onerror = () => {
				// Try fallback CDN
				const fallbackScript = document.createElement("script");
				fallbackScript.src =
					"https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.2/dist/svg-pan-zoom.min.js";

				fallbackScript.onload = () => {
					resolve();
				};

				fallbackScript.onerror = () => {
					console.warn(
						"Failed to load svg-pan-zoom, pan/zoom features will be unavailable",
					);
					resolve(); // Don't block, just degrade gracefully
				};

				document.head.appendChild(fallbackScript);
			};

			document.head.appendChild(script);
		});
	}

	// Destroy all pan-zoom instances
	function destroyAllPanZoom() {
		const containers = document.querySelectorAll(
			".mermaid-diagram-container[data-panzoom-init]",
		);
		containers.forEach((container) => {
			if (container._panZoomInstance) {
				try {
					container._panZoomInstance.destroy();
				} catch (_e) {
					// Ignore destruction errors
				}
				container._panZoomInstance = null;
			}
			// Remove controls DOM
			const controls = container.querySelector(".mermaid-controls");
			if (controls) {
				controls.remove();
			}
			container.removeAttribute("data-panzoom-init");
		});
	}

	// Initialize pan-zoom features
	function initPanZoom() {
		if (typeof window.svgPanZoom !== "function") {
			return;
		}

		const containers = document.querySelectorAll(".mermaid-diagram-container");

		containers.forEach((container) => {
			if (container.hasAttribute("data-panzoom-init")) {
				return;
			}

			const svgElement = container.querySelector(".mermaid svg");
			if (!svgElement) {
				return;
			}

			// svg-pan-zoom requires SVG to have fixed pixel dimensions
			if (!svgElement.getAttribute("viewBox")) {
				return;
			}

			// Read actual rendered dimensions after CSS constraints
			const rect = svgElement.getBoundingClientRect();
			svgElement.setAttribute("width", `${rect.width}px`);
			svgElement.setAttribute("height", `${rect.height}px`);
			svgElement.style.maxWidth = "none";
			svgElement.style.height = "";

			try {
				const panZoomInstance = window.svgPanZoom(svgElement, {
					panEnabled: true,
					zoomEnabled: true,
					controlIconsEnabled: false,
					mouseWheelZoomEnabled: true,
					dblClickZoomEnabled: true,
					minZoom: 0.5,
					maxZoom: 5,
					fit: true,
					center: true,
					zoomScaleSensitivity: 0.3,
				});

				container._panZoomInstance = panZoomInstance;
				container.setAttribute("data-panzoom-init", "true");

				// Create control bar
				const controlsDiv = document.createElement("div");
				controlsDiv.className = "mermaid-controls";

				const buttons = [
					{ label: "+", title: "Zoom In", action: () => panZoomInstance.zoomIn() },
					{
						label: "\u2212",
						title: "Zoom Out",
						action: () => panZoomInstance.zoomOut(),
					},
					{
						label: "\u21BA",
						title: "Reset",
						action: () => {
							panZoomInstance.resetZoom();
							panZoomInstance.resetPan();
							panZoomInstance.center();
						},
					},
					{
						label: "\u26F6",
						title: "Fullscreen",
						action: () => openFullscreen(container),
					},
				];

				buttons.forEach((btn) => {
					const button = document.createElement("button");
					button.className = "mermaid-ctrl-btn";
					button.textContent = btn.label;
					button.title = btn.title;
					button.addEventListener("click", (e) => {
						e.preventDefault();
						e.stopPropagation();
						btn.action();
					});
					controlsDiv.appendChild(button);
				});

				container.appendChild(controlsDiv);
			} catch (e) {
				console.warn("Failed to initialize svg-pan-zoom for a diagram:", e);
			}
		});
	}

	// Open fullscreen view
	function openFullscreen(container) {
		const svgElement = container.querySelector(".mermaid svg");
		if (!svgElement) return;

		// Create overlay
		const overlay = document.createElement("div");
		overlay.className = "mermaid-fullscreen-overlay";

		// Fullscreen content area
		const content = document.createElement("div");
		content.className = "mermaid-fs-content";

		// Clone SVG
		const clonedSvg = svgElement.cloneNode(true);
		clonedSvg.style.filter = "";
		clonedSvg.setAttribute("width", "100%");
		clonedSvg.setAttribute("height", "100%");
		clonedSvg.style.maxWidth = "none";
		content.appendChild(clonedSvg);

		// Fullscreen control bar
		const fsControls = document.createElement("div");
		fsControls.className = "mermaid-fs-controls";

		let fsInstance = null;

		const closeOverlay = () => {
			if (fsInstance) {
				try {
					fsInstance.destroy();
				} catch (_e) {
					// Ignore
				}
			}
			overlay.remove();
			document.removeEventListener("keydown", escHandler);
		};

		const escHandler = (e) => {
			if (e.key === "Escape") {
				closeOverlay();
			}
		};

		const fsButtons = [
			{
				label: "+",
				title: "Zoom In",
				action: () => fsInstance?.zoomIn(),
			},
			{
				label: "\u2212",
				title: "Zoom Out",
				action: () => fsInstance?.zoomOut(),
			},
			{
				label: "\u21BA",
				title: "Reset",
				action: () => {
					if (fsInstance) {
						fsInstance.resetZoom();
						fsInstance.resetPan();
						fsInstance.center();
					}
				},
			},
			{ label: "\u2715", title: "Close", action: closeOverlay },
		];

		fsButtons.forEach((btn) => {
			const button = document.createElement("button");
			button.className = "mermaid-ctrl-btn";
			button.textContent = btn.label;
			button.title = btn.title;
			button.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				btn.action();
			});
			fsControls.appendChild(button);
		});

		overlay.appendChild(content);
		overlay.appendChild(fsControls);
		document.body.appendChild(overlay);

		// Click background to close
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) {
				closeOverlay();
			}
		});

		// ESC to close
		document.addEventListener("keydown", escHandler);

		// Initialize pan-zoom on the SVG in the overlay
		requestAnimationFrame(() => {
			try {
				fsInstance = window.svgPanZoom(clonedSvg, {
					panEnabled: true,
					zoomEnabled: true,
					controlIconsEnabled: false,
					mouseWheelZoomEnabled: true,
					dblClickZoomEnabled: true,
					minZoom: 0.3,
					maxZoom: 10,
					fit: true,
					center: true,
					zoomScaleSensitivity: 0.3,
				});
			} catch (e) {
				console.warn("Failed to initialize fullscreen pan-zoom:", e);
			}
		});
	}

	// Main initialization function
	async function initialize() {
		try {
			// Set up listeners
			setupMutationObserver();
			setupEventListeners();

			// Initialize theme state
			initializeThemeState();

			// Load and initialize Mermaid, along with svg-pan-zoom
			await Promise.all([loadMermaid(), loadSvgPanZoom()]);
			await initializeMermaid();
		} catch (error) {
			console.error("Failed to initialize Mermaid system:", error);
		}
	}

	// Start initialization
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initialize);
	} else {
		initialize();
	}
})();
