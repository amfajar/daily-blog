import manifest from "@/config/gallery-manifest.json";
import type { GalleryAlbum } from "@/types/config";

/**
 * Get all image files in the gallery directory from pre-generated manifest
 */
export function scanAlbumPhotos(albumId: string): string[] {
	return (manifest as Record<string, string[]>)[albumId] || [];
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
