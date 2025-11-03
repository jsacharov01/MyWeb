import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Comments from "../components/Comments";
import Navbar from "../components/Navbar";

const BlogPost: React.FC = () => {
  const { slug = "" } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && post.excerpt) meta.setAttribute('content', post.excerpt);

      // Update social preview images if cover is provided
      if (post.cover) {
        const ensureMeta = (selector: string, attrs: Record<string, string>) => {
          let el = document.querySelector(selector) as HTMLMetaElement | null;
          if (!el) {
            el = document.createElement('meta');
            // set name or property first based on attrs
            if (attrs.name) el.setAttribute('name', attrs.name);
            if (attrs.property) el.setAttribute('property', attrs.property);
            document.head.appendChild(el);
          }
          Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
        };

        ensureMeta('meta[property="og:image"]', { property: 'og:image', content: post.cover });
        ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: post.cover });
      }
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
          <h1 className="text-2xl font-bold mb-4">Článek nenalezen</h1>
          <Link className="text-teal-600 dark:text-teal-400 hover:underline" to="/blog">← Zpět na blog</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
        <Link className="text-teal-600 dark:text-teal-400 hover:underline" to="/blog">← Zpět na blog</Link>
  {post.date && <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{new Date(post.date).toLocaleDateString()}</p>}
        {post.cover && (
          <div className="mt-6">
            {(() => {
              const stem = post.cover.replace(/-w\d+\.(avif|webp)(\?.*)?$/i, "");
              const widths = [400, 800, 1200, 1600];
              const avifSrcSet = widths.map(w => `${stem}-w${w}.avif ${w}w`).join(", ");
              const webpSrcSet = widths.map(w => `${stem}-w${w}.webp ${w}w`).join(", ");
              const sizes = "(min-width: 1024px) 768px, 100vw";
              const fallback = `${stem}-w800.webp`;
              return (
                <picture>
                  <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
                  <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
                  <img
                    src={fallback}
                    alt={post.title}
                    className="w-full h-auto rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              );
            })()}
          </div>
        )}
        {/* Markdown content */}
        <article className="mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="leading-7 my-4 text-gray-800 dark:text-gray-200" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="my-1" {...props} />,
              a: ({node, ...props}) => <a className="text-teal-600 dark:text-teal-400 hover:underline" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-300" {...props} />,
              hr: ({node, ...props}) => <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />,
              code: ({inline, node, ...props}: any) => inline ? (
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm" {...props} />
              ) : (
                <code className="block p-4 rounded bg-gray-900 text-gray-100 overflow-x-auto my-4 text-sm" {...props} />
              ),
              pre: ({node, ...props}) => <pre className="block p-4 rounded bg-gray-900 text-gray-100 overflow-x-auto my-4" {...props} />,
              img: ({node, ...props}) => {
                const p = props as any;
                const src: string | undefined = p?.src;
                const alt: string = p?.alt || "";
                // If the image follows the -w{width}.{ext} pattern, render a responsive <picture>
                if (typeof src === "string" && /-w\d+\.(avif|webp|jpe?g|png)(\?.*)?$/i.test(src)) {
                  const stem = src.replace(/-w\d+\.(avif|webp|jpe?g|png)(\?.*)?$/i, "");
                  const widths = [400, 800, 1200];
                  const avifSrcSet = widths.map(w => `${stem}-w${w}.avif ${w}w`).join(", ");
                  const webpSrcSet = widths.map(w => `${stem}-w${w}.webp ${w}w`).join(", ");
                  const sizes = p?.sizes || "(min-width: 1024px) 768px, 100vw";
                  const fallback = `${stem}-w800.webp`;
                  return (
                    <picture>
                      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
                      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
                      <img
                        src={fallback}
                        alt={alt}
                        className="rounded-lg my-4 max-w-full"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  );
                }
                // Fallback for other images
                return <img className="rounded-lg my-4 max-w-full" {...(props as any)} />;
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
        <div className="mt-10">
          <Comments slug={post.slug} />
        </div>
      </main>
    </>
  );
};

export default BlogPost;
