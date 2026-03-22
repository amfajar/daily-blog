import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import fs from "node:fs";
import path from "node:path";

// ─── Category enum — matches Obsidian vault folders ────────────────────────
const categoryEnum = z.enum([
	"Japanese",
	"English",
	"Komunikasi",
	"Problem Solving",
	"BI Analyst",
	"Journaling",
	"Intermezo",
]);

// ─── Posts collection ───────────────────────────────────────────────────────
// Reads from src/content/posts/ (files copied/symlinked from vault).
// Obsidian frontmatter uses `date:` while Firefly uses
// `published:`. This schema accepts both — if only `date` exists,
// it will be used as `published`.
const postsCollection = defineCollection({
	loader: glob({
		pattern: ["Belajar/**/*.md", "Journaling/**/*.md", "Intermezo/**/*.md"],
		base: "./vault",
	}),
	schema: ({ image }) =>
		z
			.object({
				title: z.string().optional().default("Untitled"),
				// `published` is the main Firefly field — optional if using `date`
				published: z.coerce.date().optional(),
				// `date` is the Obsidian frontmatter field — used as an alias
				date: z.coerce.date().optional(),
				updated: z.coerce.date().optional(),
				draft: z.boolean().optional().default(false),
				description: z.string().optional().default(""),
				image: z.string().optional().default(""),
				tags: z.array(z.string()).optional().default([]),
				// Category accepts enum slug or free string for flexibility
				category: z
					.union([categoryEnum, z.string()])
					.optional()
					.nullable()
					.default(""),
				lang: z.string().optional().default(""),
				pinned: z.boolean().optional().default(false),
				author: z.string().optional().default(""),
				sourceLink: z.string().optional().default(""),
				licenseName: z.string().optional().default(""),
				licenseUrl: z.string().optional().default(""),
				comment: z.boolean().optional().default(true),
				password: z.string().optional().default(""),
				passwordHint: z.string().optional().default(""),

				/* For internal use */
				slug: z.string().optional().default(""),
				prevTitle: z.string().default(""),
				prevSlug: z.string().default(""),
				nextTitle: z.string().default(""),
				nextSlug: z.string().default(""),
			})
			.transform((data) => ({
				...data,
				// Use `published` if it exists, otherwise use `date`
				published: data.published ?? data.date ?? new Date(),
			})),
});

// ─── Spec collection (About, Friends, Guestbook) ────────────────────────────
const specCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/spec" }),
	schema: z.object({}),
});

// ─── Roadmap collection ─────────────────────────────────────────────────────
// Contains monthly to-do per learning category.
// Source: Monthly To-do/ in Obsidian vault → copy/symlink to src/content/roadmap/
const roadmapCollection = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./vault/Monthly To-do",
	}),
	schema: z.object({
		title: z.string().optional().default("Untitled"),
		month: z.number().min(1).max(12).optional(),
		year: z.number().optional(),
		category: z
			.enum(["japanese", "english", "komunikasi", "bi-analyst"])
			.optional(),
		description: z.string().optional().default(""),
		draft: z.boolean().optional().default(false),
	}),
});

// ─── Portfolio collection ───────────────────────────────────────────────────
// Contains BI Analyst projects.
// Source: Belajar/05. BI Analyst/05. Projects/ → src/content/portfolio/
const portfolioCollection = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./vault/Belajar/05. BI Analyst/05. Projects",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date().optional(),
			tags: z.array(z.string()).optional().default([]),
			tools: z.array(z.string()).optional().default([]),
			status: z.enum(["draft", "completed"]).optional().default("draft"),
			description: z.string().optional().default(""),
			thumbnail: image().optional(),
			draft: z.boolean().optional().default(false),
		}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
	roadmap: roadmapCollection,
	portfolio: portfolioCollection,
};
