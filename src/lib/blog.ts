import fm from "front-matter";

export type BlogMeta = {
  title: string;
  date: string; // ISO or YYYY-MM-DD
  slug: string;
  excerpt?: string;
  cover?: string;
  tags?: string[];
};

export type BlogPost = BlogMeta & {
  content: string;
};

// Vite will inline raw markdown at build time
const rawPosts = import.meta.glob("/src/blog/posts/**/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

let cached: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cached) return cached;
  const items: BlogPost[] = Object.entries(rawPosts).map(([path, raw]) => {
    const parsed = fm<Partial<BlogMeta>>(raw);
    const attrs = parsed.attributes || {};
    const slug: string = String(attrs.slug || deriveSlugFromPath(path));
    const title: string = String(attrs.title || slug);
    const date: string = String(attrs.date || "");
    const excerpt: string | undefined = attrs.excerpt ? String(attrs.excerpt) : undefined;
    const cover: string | undefined = attrs.cover ? String(attrs.cover) : undefined;
    const tags: string[] | undefined = Array.isArray(attrs.tags) ? (attrs.tags as any[]).map(String) : undefined;
    return { slug, title, date, excerpt, cover, tags, content: String(parsed.body || "").trim() };
  });
  // sort by date desc if provided, otherwise by title
  items.sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
  cached = items;
  return items;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(p => p.slug === slug);
}

function deriveSlugFromPath(path: string): string {
  const file = path.split("/").pop() || path;
  return file.replace(/\.md$/i, "");
}
