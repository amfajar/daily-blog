import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

/**
 * This script fetches the contents from a separate vault repository
 * and places it in the 'vault' directory for Astro to process.
 */

const VAULT_REPO = 'https://github.com/amfajar/blog-contents.git';
const VAULT_PATH = path.join(process.cwd(), 'vault');

function run(cmd) {
    try {
        console.log(`[Fetch Contents] Running: ${cmd}`);
        execSync(cmd, { stdio: 'inherit' });
    } catch (err) {
        console.error(`[Fetch Contents] Error executing command: ${cmd}`);
        process.exit(1);
    }
}

// Support private repo via token in env (VAULT_REPO_TOKEN)
const token = process.env.VAULT_REPO_TOKEN;
const repoUrl = token 
    ? VAULT_REPO.replace('https://', `https://${token}@`)
    : VAULT_REPO;

if (existsSync(VAULT_PATH)) {
    console.log('[Fetch Contents] Vault directory already exists.');
    
    // Check if it's a git repository
    const isGitRepo = existsSync(path.join(VAULT_PATH, '.git'));

    // In CI environment (like Cloudflare Pages), or if not a git repo, we perform a clean clone
    if (process.env.CF_PAGES || process.env.CI || !isGitRepo) {
        console.log(`[Fetch Contents] ${!isGitRepo ? 'Not a git repo' : 'CI environment'}. Re-cloning...`);
        rmSync(VAULT_PATH, { recursive: true, force: true });
        run(`git clone ${repoUrl} "${VAULT_PATH}"`);
    } else {
        console.log('[Fetch Contents] Local environment. Pulling latest changes...');
        try {
            run(`git -C "${VAULT_PATH}" pull`);
        } catch (err) {
            console.warn('[Fetch Contents] Failed to pull. Attempting re-clone...');
            rmSync(VAULT_PATH, { recursive: true, force: true });
            run(`git clone ${repoUrl} "${VAULT_PATH}"`);
        }
    }
} else {
    console.log('[Fetch Contents] Cloning vault repository...');
    run(`git clone ${repoUrl} "${VAULT_PATH}"`);
}

console.log('[Fetch Contents] Successfully synchronized vault content.');
