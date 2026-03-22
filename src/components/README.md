# 📦 Components Directory

Centralized management for all reusable components in the Firefly project. Components are categorized by functionality and responsibility, providing a clear architecture and easy-to-maintain code organization.

## 📁 Directory Structure

### 🏗️ layout/ - Page Layout Components
Components responsible for the overall page framework and layout structure.
- `CategoryBar.astro` - Category bar component
- `ConfigCarrier.astro` - Configuration carrier component
- `DropdownMenu.astro` - Dropdown menu component
- `Footer.astro` - Footer component
- `Navbar.astro` - Navigation bar component
- `NavMenuPanel.astro` - Navigation menu panel
- `PostCard.astro` - Post summary card
- `PostMeta.astro` - Post metadata display
- `PostPage.astro` - Post list page layout
- `SideBar.astro` - Sidebar component

### 🎮 controls/ - Navigation and Interaction Controls
Components for page navigation and user interaction features.

**Navigation Controls**
- `BackToHome.astro` - Back to home button
- `BackToTop.astro` - Back to top button
- `FloatingControls.astro` - Container for floating controls at the bottom right
- `FloatingTOC.astro` - Floating Table of Contents

**Interaction Components**
- `ArchivePanel.svelte` - Archive panel component
- `DisplaySettings.svelte` - Display settings component
- `DisplaySettingsIntegrated.svelte` - Integrated display settings
- `LayoutSwitchButton.svelte` - Layout switch button
- `LightDarkSwitch.svelte` - Theme toggle component
- `Search.svelte` - Search functionality component
- `WallpaperSwitch.svelte` - Wallpaper mode toggle

### 🔧 common/ - Shared Reusable Components
Generic UI and utility components designed for cross-project reuse.

**Base UI Components**
- `ButtonLink.astro` - Link button
- `ButtonTag.astro` - Tag button
- `DropdownItem.astro`/`.svelte` - Dropdown option
- `DropdownPanel.astro`/`.svelte` - Dropdown panel container
- `FloatingButton.astro` - Base floating button
- `Icon.svelte` - Icon component (with loading and error handling)
- `WidgetLayout.astro` - Widget layout container

**Content and Presentation**
- `CoverImage.astro` - Cover image component (supports local & API)
- `ImageWrapper.astro` - Image wrapper (supports local & remote)
- `Markdown.astro` - Markdown content style wrapper
- `PioMessageBox.astro` - Message box for Live2D/Spine models

**Pagination**
- `ClientPagination.astro` - Client-side pagination (JS controlled)
- `Pagination.astro` - Static route pagination (Astro native)

### 🧩 widget/ - Widgets
Functional widgets used in the sidebar.
- `Announcement.astro` - Announcement widget
- `Profile.astro` - User profile widget
- `PostTOC.astro` - Post table of contents
- `TagCloud.astro` - Tag cloud widget
- `Categories.astro` - Category list widget
- `RecentPosts.astro` - Recent posts list

### 🎈 features/ - Specialized Features
Components for specific features like encryption, math, or special effects.
- `EncryptedPost.astro` - Post encryption wrapper
- `KatexManager.astro` - KaTeX math rendering manager
- `SakuraCanvas.svelte` - Sakura falling effect canvas
- `Pio.svelte` - Live2D/Spine model component

### 🎵 music/ - Music Player
Components for the music player feature.
- `MusicPlayer.astro` / `MusicPlayerInner.svelte` - Music player components
- `Meting.svelte` - Meting API integration component

### 🖼️ misc/ - Miscellaneous
- `License.astro` - Content license component
- `RecommendedPost.astro` - Post recommendations
- `SharePoster.svelte` - Share poster generation component
- `Giscus.astro` / `Waline.svelte` / `Twikoo.svelte` / `Artalk.svelte` - Comment system components
