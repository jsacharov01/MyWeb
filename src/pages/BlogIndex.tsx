import React from "react";
import { getAllPosts } from "../lib/blog";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const BlogIndex: React.FC = () => {
  const posts = getAllPosts();
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-6">
        {posts.map(p => (
          <li key={p.slug} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-start gap-4">
              {p.cover && (
                <Link to={`/blog/${p.slug}`} className="shrink-0 block">
                  {(() => {
                    // Responsive thumbnails: srcset for 400 and 800 widths
                    const stem = p.cover.replace(/-w\d+\.(avif|webp)(\?.*)?$/i, "");
                    const widths = [400, 800];
                    const avifSrcSet = widths.map(w => `${stem}-w${w}.avif ${w}w`).join(", ");
                    const webpSrcSet = widths.map(w => `${stem}-w${w}.webp ${w}w`).join(", ");
                    const sizes = "96px"; // matches w-24 thumbnail size
                    const fallback = `${stem}-w400.webp`;
                    return (
                      <picture>
                        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
                        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
                        <img
                          src={fallback}
                          alt={p.title}
                          className="w-24 h-24 object-cover rounded-md ring-1 ring-black/5 dark:ring-white/10"
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    );
                  })()}
                </Link>
              )}
              <div className="min-w-0">
                <h2 className="text-xl font-semibold">
                  <Link className="text-teal-600 dark:text-teal-400 hover:underline" to={`/blog/${p.slug}`}>{p.title}</Link>
                </h2>
                {p.date && <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(p.date).toLocaleDateString()}</p>}
                {p.excerpt && <p className="mt-2 text-gray-700 dark:text-gray-300">{p.excerpt}</p>}
                <p className="mt-3">
                  <Link className="text-teal-600 dark:text-teal-400 hover:underline" to={`/blog/${p.slug}`}>Číst dál →</Link>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </main>
    </>
  );
};

export default BlogIndex;
