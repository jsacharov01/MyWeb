import React from "react";
import HomePage from "./pages/HomePage";
import { services } from "./data/services";
import { projects } from "./data/projects";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";


const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage services={services} projects={projects} />} />
				<Route path="/blog" element={<BlogIndex />} />
				<Route path="/blog/:slug" element={<BlogPost />} />
				{/* legacy hash/section routes handled inside HomePage via anchors; keep fallback to home */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};


export default App;