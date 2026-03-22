/**
 * Icon loading manager
 * Responsible for handling icon loading state display
 */

export function initIconLoader() {
	// Initialize single icon container
	function initContainer(container: Element) {
		if (container.hasAttribute("data-icon-initialized")) return;
		container.setAttribute("data-icon-initialized", "true");

		const loadingIndicator = container.querySelector(
			"[data-loading-indicator]",
		) as HTMLElement;
		const iconElement = container.querySelector(
			"[data-icon-element]",
		) as HTMLElement;
		const iconName = iconElement?.getAttribute("icon");

		if (!loadingIndicator || !iconElement) return;

		// Check if the icon is already loaded
		function checkIconLoaded() {
			const hasContent =
				iconElement.shadowRoot && iconElement.shadowRoot.children.length > 0;

			if (hasContent) {
				showIcon();
				return true;
			}
			return false;
		}

		// Show icon, hide loading indicator
		function showIcon() {
			loadingIndicator.style.display = "none";
			iconElement.classList.remove("opacity-0");
			iconElement.classList.add("opacity-100");
		}

		// Show loading indicator, hide icon
		function showLoading() {
			loadingIndicator.style.display = "inline-flex";
			iconElement.classList.remove("opacity-100");
			iconElement.classList.add("opacity-0");
		}

		// Initial state
		showLoading();

		// Listen for icon load event
		iconElement.addEventListener("load", () => {
			showIcon();
		});

		// Listen for icon loading errors
		iconElement.addEventListener("error", () => {
			// Keep showing fallback indicator on error
			if (iconName) {
				console.warn(`Failed to load icon: ${iconName}`);
			}
		});

		// Monitor shadow DOM changes using MutationObserver
		if (window.MutationObserver) {
			const observer = new MutationObserver(() => {
				if (checkIconLoaded()) {
					observer.disconnect();
				}
			});

			// Watch for changes within iconify-icon elements
			observer.observe(iconElement, {
				childList: true,
				subtree: true,
				attributes: true,
			});

			// Set timeout to avoid infinite waiting
			setTimeout(() => {
				observer.disconnect();
				if (!checkIconLoaded()) {
					// console.warn(`Icon load timeout: ${iconName}`);
				}
			}, 5000);
		}

		// Check once immediately (might already be loaded)
		setTimeout(() => {
			checkIconLoaded();
		}, 100);
	}

	// Initialize existing icons on the page
	document.querySelectorAll("[data-icon-container]").forEach(initContainer);

	// Listen for newly added icons
	if (window.MutationObserver) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						const el = node as Element;
						if (el.hasAttribute?.("data-icon-container")) {
							initContainer(el);
						} else {
							el.querySelectorAll("[data-icon-container]").forEach(
								initContainer,
							);
						}
					}
				});
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
}
