import React, { FC } from "react";
import { Moon, Sun } from "lucide-react";


interface NavbarProps {
darkMode: boolean;
toggleDarkMode: () => void;
}


const Navbar: FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
return (
	<header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 text-gray-900 dark:bg-gray-800/80 dark:text-gray-100 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
		<h1 className="text-xl font-bold">IT PM & Analyst</h1>
		<nav className="space-x-6 hidden md:block">
			<a href="#about" className="hover:text-teal-600 dark:hover:text-teal-400 transition">About</a>
			<a href="#services" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Services</a>
			<a href="#portfolio" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Portfolio</a>
			<a href="#contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Contact</a>
		</nav>
		<button
			onClick={toggleDarkMode}
			className="ml-4 p-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition"
			aria-label="Toggle Dark Mode"
		>
			{darkMode ? <Sun size={20} /> : <Moon size={20} />}
		</button>
	</header>
);
};


export default Navbar;