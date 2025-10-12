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
              img: ({node, ...props}) => <img className="rounded-lg my-4 max-w-full" {...props as any} />,
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
