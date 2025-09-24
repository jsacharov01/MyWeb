import React, { FC } from "react";
import logo from "../logo.png";




const Navbar: FC = () => {
		return (
		<header className="flex justify-between items-center px-8 py-4 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700
			bg-white/80 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 backdrop-blur-md">
			<h1 className="text-xl font-bold">
				<a href="/" aria-label="Home">
					<img src={logo} alt="Crystal IT" className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto" loading="eager" decoding="async" />
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