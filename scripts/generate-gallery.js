import fs from 'node:fs';
import path from 'node:path';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const MANIFEST_PATH = path.join(process.cwd(), 'src', 'config', 'gallery-manifest.json');

/**
 * Scan all image files in the gallery directory and generate a manifest
 */
function scanGallery() {
    if (!fs.existsSync(GALLERY_DIR)) {
        console.log('[Gallery Manifest] Gallery directory not found. Skipping.');
        // Create an empty manifest if the directory doesn't exist
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify({}, null, 2));
        return;
    }

    const manifest = {};
    const albums = fs.readdirSync(GALLERY_DIR).filter(f => {
        const fullPath = path.join(GALLERY_DIR, f);
        return fs.statSync(fullPath).isDirectory();
    });

    for (const albumId of albums) {
        const dir = path.join(GALLERY_DIR, albumId);
        const files = fs.readdirSync(dir)
            .filter(f => /\.(jpe?g|png|webp|avif|gif)$/i.test(f))
            .sort();
            
        // Put cover.* at the first position
        const coverIdx = files.findIndex(f => /^cover\./i.test(f));
        if (coverIdx > 0) {
            const [coverFile] = files.splice(coverIdx, 1);
            files.unshift(coverFile);
        }
        
        manifest[albumId] = files.map(f => `/gallery/${albumId}/${f}`);
    }

    // Ensure the directory exists
    const manifestDir = path.dirname(MANIFEST_PATH);
    if (!fs.existsSync(manifestDir)) {
        fs.mkdirSync(manifestDir, { recursive: true });
    }

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`[Gallery Manifest] Success: Scanned ${albums.length} albums. Written to ${MANIFEST_PATH}`);
}

scanGallery();
