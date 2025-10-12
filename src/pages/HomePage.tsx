/// <reference types="vite/client" />
// 📁 src/pages/HomePage.tsx
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import PricingSection from "../components/PricingSection";
import portrait from "../portrait.png";
import ContactSection from "../components/ContactSection";
import { ShieldCheck, Gauge, Rocket, BarChart3, Eye, MapPin, Globe, Briefcase } from "lucide-react";

interface Service {
  title: string;
  description: string;
}

interface Project {
  name: string;
  summary: string;
}

interface HomePageProps {
  services: Service[];
  projects: Project[];
}

const HomePage: FC<HomePageProps> = ({ services, projects }) => {
  // Contact form state moved into ContactSection component.

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Full-width navbar (outside of the constrained container) */}
      <Navbar />

      <div className="container mx-auto max-w-6xl">

        {/* Hero */}
        <section className="relative overflow-hidden px-8 py-16 md:py-24">
          {/* Decorative background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-40"
          >
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-teal-200/40 dark:bg-teal-500/20"></div>
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl bg-sky-200/40 dark:bg-sky-500/20"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
            <motion.div
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-3 py-1 text-sm text-teal-700 shadow-sm dark:border-teal-800 dark:bg-gray-800/70 dark:text-teal-300">
                Dostupný pro projekty na volné noze a konzultace.
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-3 py-1 text-sm text-violet-700 shadow-sm dark:border-violet-800 dark:bg-gray-800/70 dark:text-violet-300">
                Certifikace PRINCE2 Project Manager (Foundation + Practitioner).
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-teal-500 to-sky-600 bg-clip-text text-transparent">
                  IT Projektový Manažer
                </span>
                <span className="block text-gray-900 dark:text-gray-100">& Byznys Analytik</span>
              </h1>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Zajišťuji realizaci změn, které mají skutečný dopad na váš byznys. Zaměřuji se na spolehlivou
                realizaci, efektivitu a jasnou komunikaci.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.location.hash = "contact";
                  }}
                >
                  Budu rád, když se mi ozvete.
                </Button>
                <Button
                  className="bg-gray-900/90 hover:bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
                  onClick={() => {
                    const el = document.getElementById("portfolio");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.location.hash = "portfolio";
                  }}
                >
                  Ukázky projektů
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-tr from-teal-400/40 to-sky-400/40 blur-xl"></div>
                {import.meta.env.PROD ? (
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/optimized/portrait-w400.avif 400w"
                      sizes="(min-width:1024px) 480px, (min-width:768px) 420px, 100vw"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/optimized/portrait-w400.webp 400w"
                      sizes="(min-width:1024px) 480px, (min-width:768px) 420px, 100vw"
                    />
                    <img
                      src={portrait}
                      alt="Jurij Sacharov – IT projektový manažer a byznys analytik"
                      className="w-full rounded-3xl ring-1 ring-gray-200 shadow-xl dark:ring-gray-700"
                      loading="eager"
                      decoding="async"
                    />
                  </picture>
                ) : (
                  <img
                    src={portrait}
                    alt="Jurij Sacharov – IT projektový manažer a byznys analytik"
                    className="w-full rounded-3xl ring-1 ring-gray-200 shadow-xl dark:ring-gray-700"
                    loading="eager"
                    decoding="async"
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Let zkušeností v IT</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">25+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projektů dokončeno</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">5+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Zemí</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Zaměření na zákazníka</div>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section id="about" className="px-8 py-16 bg-white/70 dark:bg-gray-700">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left: text content */}
            <div className="md:col-span-7">
              <motion.h3
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                O mně
              </motion.h3>
              <motion.p
                className="max-w-3xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                IT projekty vnímám jako kombinaci technologií, lidí a jasně definovaných cílů.
                Pomáhám firmám nastavit procesy tak, aby projekty běžely hladce a požadavky byly správně pochopené i realizované.
                Zakládám si na otevřené komunikaci, spolehlivosti a férovém jednání.
                Jsem držitelem certifikace PRINCE2 Project Manager (Foundation + Practitioner), kterou využívám k aplikaci strukturovaných a ověřených principů v projektovém řízení.
              </motion.p>
              <motion.ul
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden />
                  <span>Důvěrohodnost</span>
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden />
                  <span>Transparentnost</span>
                </li>
                <li className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden />
                  <span>Leadership</span>
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden />
                  <span>Analytické myšlení</span>
                </li>
              </motion.ul>
            </div>

            {/* Right: Quick Facts card */}
            <motion.aside
              className="md:col-span-5 relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {/* Decorative gradient blob */}
              <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 opacity-70">
                <div className="absolute -top-8 -right-6 h-48 w-48 rounded-full blur-3xl bg-teal-300/40 dark:bg-teal-500/20" />
                <div className="absolute -bottom-10 -left-8 h-56 w-56 rounded-full blur-3xl bg-sky-300/40 dark:bg-sky-500/20" />
              </div>

              <div className="relative rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70">
                <h4 className="text-lg font-semibold mb-4">Rychlá fakta</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden />
                    <span>Praha · remote / onsite</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden />
                    <span>Freelancer & konzultant</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden />
                    <span>Jazyky: CZ / EN / RU</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden />
                    <span>Zaměření: projekty s měřitelným dopadem</span>
                  </li>
                </ul>

                <div className="mt-4 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  PRINCE2® Project Manager
                </div>

                <div className="mt-5">
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                      else window.location.hash = "contact";
                    }}
                    aria-label="Přejít na kontaktní formulář"
                  >
                    Ozvěte se mi
                  </Button>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-8 py-16">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">Služby</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Co pro vás mohu udělat — od analýzy po realizaci.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <ServiceCard title={service.title} description={service.description} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="px-8 py-12">
          <h3 className="text-2xl font-bold mb-4">Tech Stack</h3>
          <ul className="flex flex-wrap gap-2 text-sm">
            {[
              "Agile / Scrum",
              "PRINCE2 Project Manager (Foundation + Practitioner)",
              "Jira",
              "Confluence",
              "M365",
              "Google Suite",
              "SQL",
              "Power BI",
              "APIs",
              "AI",
            ].map((t) => (
              <li key={t} className="rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-gray-700 dark:bg-gray-800">
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Certification Section */}
        <section id="certifikace" className="px-8 py-12">
          <h3 className="text-2xl font-bold mb-4">Certifikace</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 text-sm font-semibold">
                P2
              </div>
              <div>
                <p className="font-semibold">PRINCE2 Project Manager (Foundation + Practitioner)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Držitel obou certifikací PRINCE2 Foundation a PRINCE2 Practitioner – způsobilý samostatně vykonávat roli projektového manažera dle metodiky PRINCE2 (principy, témata, procesy a tailoring).
                </p>
              </div>
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/certifikaty/PRINCE2Practitioner.pdf"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md border border-violet-200 bg-white/70 px-3 py-1 text-sm font-medium text-violet-700 hover:bg-violet-50 hover:text-violet-900 dark:border-violet-800 dark:bg-gray-800/70 dark:text-violet-300 dark:hover:bg-gray-800"
              aria-label="Otevřít certifikát PRINCE2 Practitioner (PDF) v novém okně"
            >
              PRINCE2 Practitioner (PDF)
              <span aria-hidden className="text-xs">↗</span>
              <span className="sr-only">Otevře se v novém okně</span>
            </a>
            <a
              href="/certifikaty/PRINCE2ProjectManager.pdf"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md border border-violet-200 bg-white/70 px-3 py-1 text-sm font-medium text-violet-700 hover:bg-violet-50 hover:text-violet-900 dark:border-violet-800 dark:bg-gray-800/70 dark:text-violet-300 dark:hover:bg-gray-800"
              aria-label="Otevřít certifikát PRINCE2 Project Manager (PDF) v novém okně"
            >
              PRINCE2 Project Manager (PDF)
              <span aria-hidden className="text-xs">↗</span>
              <span className="sr-only">Otevře se v novém okně</span>
            </a>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="px-8 py-16 bg-white/70 dark:bg-gray-700">
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Portfolio
          </motion.h3>
          <p className="mb-8 text-gray-600 dark:text-gray-300">Vybrané projekty a případové studie.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <ProjectCard name={project.name} summary={project.summary} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing (Ceník) */}
        <PricingSection />


        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <footer className="px-8 py-6 bg-sky-50 text-gray-700 dark:bg-gray-800 dark:text-gray-100 text-center border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-2">
            <div>
              © {new Date().getFullYear()} Jurij Sacharov — IT Projektový manažer & Byznys analytik. Všechna práva vyhrazena.
            </div>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
              PRINCE2® Project Manager
            </span>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">PRINCE2® je registrovaná ochranná známka AXELOS Limited.</p>
            <a
              href="https://www.linkedin.com/in/jurij-sacharov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-200 underline decoration-dotted"
              aria-label="Otevřít můj LinkedIn profil v novém okně"
            >
              LinkedIn profil
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
