import React from "react";
import HomePage from "./pages/HomePage";
import { services } from "./data/services";
import { projects } from "./data/projects";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Route-level code splitting for blog pages
const BlogIndex = React.lazy(() => import("./pages/BlogIndex"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));


const App: React.FC = () => {
	return (
		<BrowserRouter>
			<React.Suspense fallback={<div style={{ padding: 24 }}>Načítání…</div>}>
				<Routes>
					<Route path="/" element={<HomePage services={services} projects={projects} />} />
					<Route path="/blog" element={<BlogIndex />} />
					<Route path="/blog/:slug" element={<BlogPost />} />
					{/* legacy hash/section routes handled inside HomePage via anchors; keep fallback to home */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</React.Suspense>
		</BrowserRouter>
	);
};


export default App;