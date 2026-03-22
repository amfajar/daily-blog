# Configuration File Guide

This directory contains all the configuration files for the Firefly theme. It uses a modular design where each file is responsible for a specific functional module.

## 📁 Configuration File Structure

```text
src/config/
├── index.ts              # Configuration Index - Unified Export
├── siteConfig.ts         # Base Site Configuration
├── backgroundWallpaper.ts # Background & Banner Configuration
├── profileConfig.ts      # User Profile Configuration
├── musicConfig.ts        # Music Player Configuration
├── sakuraConfig.ts       # Sakura Effect Configuration
├── commentConfig.ts      # Comment System Configuration
├── announcementConfig.ts # Announcement Configuration
├── licenseConfig.ts      # License Configuration
├── footerConfig.ts       # Footer Configuration
├── expressiveCodeConfig.ts # Code Highlighting Configuration
├── fontConfig.ts         # Font Configuration
├── sidebarConfig.ts      # Sidebar Configuration
├── navBarConfig.ts       # Navigation Bar Configuration
├── pioConfig.ts          # Pio Model Configuration
├── adConfig.ts           # Ad Configuration
├── friendsConfig.ts      # Friend Links Configuration
├── galleryConfig.ts      # Album Configuration
├── sponsorConfig.ts      # Sponsor Configuration
├── coverImageConfig.ts   # Cover Image Configuration
└── README.md             # This file
```

## 🚀 Usage

### Recommended: Use Config Index (Unified Import)

```typescript
import { siteConfig, profileConfig } from "@/config";
```

### Direct Import of Single Config

```typescript
import { siteConfig } from "@/config/siteConfig";
```

## 📋 Configuration File List

- `siteConfig.ts` - Base site configuration (Title, description, theme color, etc.)
- `backgroundWallpaper.ts` - Background wallpaper configuration (Mode, images, banner text, etc.)
- `profileConfig.ts` - User profile configuration (Avatar, name, social links, etc.)
- `musicConfig.ts` - Music player configuration (Supports local and Meting API)
- `sakuraConfig.ts` - Sakura effect configuration (Quantity, speed, size, etc.)
- `commentConfig.ts` - Comment system configuration (Twikoo comments and view statistics)
- `announcementConfig.ts` - Announcement configuration (Title, content, link, etc.)
- `licenseConfig.ts` - License configuration (CC protocols, etc.)
- `footerConfig.ts` - Footer configuration (HTML injection, etc.)
- `expressiveCodeConfig.ts` - Code highlighting configuration (Themes, etc.)
- `fontConfig.ts` - Font configuration (Families, sizes, etc.)
- `sidebarConfig.ts` - Sidebar configuration (Component layout, etc.)
- `navBarConfig.ts` - Navigation bar configuration (Links, styles, etc.)
- `pioConfig.ts` - Pio model configuration (Spine, Live2D, etc.)
- `adConfig.ts` - Ad configuration (Ad placements, etc.)
- `friendsConfig.ts` - Friend links configuration (Friend lists, etc.)
- `sponsorConfig.ts` - Sponsor configuration (Payment methods, QR codes, etc.)
- `coverImageConfig.ts` - Cover image configuration (Random cover lists, etc.)
