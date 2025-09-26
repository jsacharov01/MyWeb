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
import { ShieldCheck, Gauge, Rocket, BarChart3, Eye } from "lucide-react";

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
      <div className="container mx-auto max-w-6xl">
        <Navbar />

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
                Certifikace PRINCE2 Foundation
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-teal-500 to-sky-600 bg-clip-text text-transparent">
                  IT Projektový Manažer
                </span>
                <span className="block text-gray-900 dark:text-gray-100">& Byznys Analytik</span>
              </h2>
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
                <img
                  src={portrait}
                  alt="Professional portrait"
                  className="w-full rounded-3xl ring-1 ring-gray-200 shadow-xl dark:ring-gray-700"
                />
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
            Pomáhám firmám úspěšně vést IT projekty a efektivně analyzovat byznysové požadavky. 
            Stavím na spolehlivosti, transparentnosti a férovosti. Mám certifikaci PRINCE2 Foundation – strukturovaný přístup k řízení projektů a terminologii metodiky aplikuji v praxi.
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
              "Agile/Scrum",
              "PRINCE2 Foundation",
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
                <p className="font-semibold">PRINCE2 Foundation</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Základy metodiky PRINCE2 – principy, témata, řízení po etapách a společná terminologie pro efektivní spolupráci.
                </p>
              </div>
            </li>
          </ul>
          <a
            href="/certifikaty/Prince2.pdf"
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-2 text-sm text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-200 underline decoration-dotted"
            aria-label="Otevřít certifikát PRINCE2 (PDF) v novém okně"
          >
            Zobrazit certifikát (PDF)
            <span className="sr-only">Otevře se v novém okně</span>
          </a>
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
              © {new Date().getFullYear()} IT Projektový Manažer & Byznys Analytik. Všechna práva vyhrazena.
            </div>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
              PRINCE2® Foundation
            </span>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">PRINCE2® je registrovaná ochranná známka AXELOS Limited.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
