import fs from "node:fs";
import path from "node:path";
import type { GalleryAlbum } from "@/types/config";

/**
 * Scan all image files in the gallery directory
 */
export function scanAlbumPhotos(albumId: string): string[] {
	const dir = path.join(process.cwd(), "public", "gallery", albumId);
	if (!fs.existsSync(dir)) return [];
	const files = fs
		.readdirSync(dir)
		.filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f))
		.sort();
	// Put cover.* at the first position
	const coverIdx = files.findIndex((f) => /^cover\./i.test(f));
	if (coverIdx > 0) {
		const [coverFile] = files.splice(coverIdx, 1);
		files.unshift(coverFile);
	}
	return files.map((f) => `/gallery/${albumId}/${f}`);
}

/**
 * Get gallery cover image
 * Priority: manually specified > cover.* file > first image
 */
export function getAlbumCover(album: GalleryAlbum, photos: string[]): string {
	if (album.cover) return album.cover;
	const coverFile = photos.find((p) => /\/cover\./i.test(p));
	return coverFile || photos[0] || "";
}
