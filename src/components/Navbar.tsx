import React, { FC, useState } from "react";
import logoLight from "../logo.png";
import logoDark from "../logo_dark.png";
import { Linkedin, Menu, X } from "lucide-react";




const Navbar: FC = () => {
	const [open, setOpen] = useState(false);

	const closeMenu = () => setOpen(false);

	return (
		<header className="flex justify-between items-center px-8 py-4 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700
			bg-white/80 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 backdrop-blur-md">
			<h1 className="relative flex items-center gap-3 text-xl font-bold">
				<a href="/" aria-label="Home">
					{/* Light mode logo */}
					<img
						src={logoLight}
						alt="Crystal IT"
						className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto dark:hidden"
						loading="eager"
						decoding="async"
					/>
					{/* Dark mode logo */}
					<img
						src={logoDark}
						alt="Crystal IT"
						className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto hidden dark:block"
						loading="eager"
						decoding="async"
					/>

					<span className="hidden md:block absolute left-10 bottom-4 text-sm font-semibold text-gray-900 dark:text-gray-100 pointer-events-none">
						Jurij Sacharov
					</span>
				</a>
				{/* Mobile-only name next to the logo when menu is closed */}
				<span className="md:hidden block text-sm font-semibold text-gray-900 dark:text-gray-100">
					Jurij Sacharov
				</span>
			</h1>
			<nav className="space-x-6 hidden md:flex items-center">
				<a href="/#about" className="hover:text-teal-600 dark:hover:text-teal-400 transition">O mně</a>
				<a href="/#services" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Služby</a>
				<a href="/#portfolio" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Moje práce</a>
				<a href="/#pricing" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Ceník</a>
				<a href="/#contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Kontakt</a>
				<a href="/blog" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Blog</a>
				<a
					href="https://www.linkedin.com/in/jurij-sacharov/"
					title="LinkedIn profil"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition"
				>
					<Linkedin className="h-5 w-5" aria-hidden />
					<span>LinkedIn</span>
				</a>
			</nav>

			{/* Mobile menu button */}
			<button
				className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
				aria-label="Toggle navigation menu"
				aria-expanded={open}
				onClick={() => setOpen(o => !o)}
			>
				{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
			</button>

			{/* Mobile panel */}
			{open && (
				<div className="absolute left-0 right-0 top-full mt-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-6 shadow-lg md:hidden animate-in fade-in slide-in-from-top-2">
					<ul className="flex flex-col gap-4 text-sm">
						{/* Moved name next to logo for mobile; removed from mobile menu */}
						<li><a onClick={closeMenu} href="/#about" className="block hover:text-teal-600 dark:hover:text-teal-400">O mně</a></li>
						<li><a onClick={closeMenu} href="/#services" className="block hover:text-teal-600 dark:hover:text-teal-400">Služby</a></li>
						<li><a onClick={closeMenu} href="/#pricing" className="block hover:text-teal-600 dark:hover:text-teal-400">Ceník</a></li>
						<li><a onClick={closeMenu} href="/#portfolio" className="block hover:text-teal-600 dark:hover:text-teal-400">Moje práce</a></li>
						<li><a onClick={closeMenu} href="/#contact" className="block hover:text-teal-600 dark:hover:text-teal-400">Kontakt</a></li>
						<li><a onClick={closeMenu} href="/blog" className="block hover:text-teal-600 dark:hover:text-teal-400">Blog</a></li>
						<li>
							<a
								className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 dark:hover:border-teal-500"
								href="https://www.linkedin.com/in/jurij-sacharov/"
								target="_blank"
								rel="noopener noreferrer"
								onClick={closeMenu}
							>
								<Linkedin className="h-5 w-5" aria-hidden />
								<span>LinkedIn profil</span>
							</a>
						</li>
					</ul>
				</div>
			)}
			{/* Removed dark mode toggle button. Dark mode is now automatic. */}
		</header>
	);
};


export default Navbar;