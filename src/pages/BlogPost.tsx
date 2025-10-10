import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LikeButton from "../components/LikeButton";
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
      <main className="prose dark:prose-invert max-w-3xl mx-auto px-6 py-10">
        <Link className="no-underline" to="/blog">← Zpět na blog</Link>
        <h1>{post.title}</h1>
        {post.date && <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>}
        <div className="my-6 text-sm">
          <LikeButton slug={post.slug} />
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        <div className="mt-10">
          <Comments slug={post.slug} />
        </div>
      </main>
    </>
  );
};

export default BlogPost;
