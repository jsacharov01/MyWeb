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
            <h2 className="text-xl font-semibold">
              <Link className="text-teal-600 dark:text-teal-400 hover:underline" to={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>
            {p.date && <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(p.date).toLocaleDateString()}</p>}
            {p.excerpt && <p className="mt-2 text-gray-700 dark:text-gray-300">{p.excerpt}</p>}
            <p className="mt-3">
              <Link className="text-teal-600 dark:text-teal-400 hover:underline" to={`/blog/${p.slug}`}>Číst dál →</Link>
            </p>
          </li>
        ))}
      </ul>
      </main>
    </>
  );
};

export default BlogIndex;
