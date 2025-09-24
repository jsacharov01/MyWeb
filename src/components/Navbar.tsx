import React, { FC } from "react";





const Navbar: FC = () => {
		return (
		<header className="flex justify-between items-center px-8 py-4 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700
			bg-white/80 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 backdrop-blur-md">
			<h1 className="text-xl font-bold">
				<a href="/" aria-label="Home">
					<img src="/logo.png" alt="Crystal IT logo linking to home" className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto" />
				</a>
			</h1>
			<nav className="space-x-6 hidden md:block">
				<a href="#about" className="hover:text-teal-600 dark:hover:text-teal-400 transition">About</a>
				<a href="#services" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Services</a>
				<a href="#portfolio" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Portfolio</a>
				<a href="#contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Contact</a>
			</nav>
			{/* Removed dark mode toggle button. Dark mode is now automatic. */}
		</header>
	);
};


export default Navbar;