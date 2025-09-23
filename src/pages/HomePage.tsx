/// <reference types="vite/client" />
// 📁 src/pages/HomePage.tsx
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import portrait from "../portrait.png";
import { sendContact } from "../lib/contact";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok?: boolean; error?: string } | null>(null);

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
                Available for freelance & consulting
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-teal-500 to-sky-600 bg-clip-text text-transparent">
                  IT Project Manager
                </span>
                <span className="block text-gray-900 dark:text-gray-100">& Business Analyst</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Řídím projekty, které spojují technologie a byznys. Zaměřuji se na spolehlivou
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
                  Contact Me
                </Button>
                <Button
                  className="bg-gray-900/90 hover:bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
                  onClick={() => {
                    const el = document.getElementById("portfolio");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.location.hash = "portfolio";
                  }}
                >
                  View Portfolio
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
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">8+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">25+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Industries</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Delivery Focus</div>
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
            About Me
          </motion.h3>
          <motion.p 
            className="max-w-3xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Specializuji se na vedení IT projektů, procesní a datovou analýzu. Mojí
            prioritou je spolehlivost, efektivita a leadership.
          </motion.p>
          <motion.ul 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <li>✔️ Reliability</li>
            <li>⚙️ Efficiency</li>
            <li>🚀 Leadership</li>
            <li>📊 Analytical Thinking</li>
          </motion.ul>
        </section>

        {/* Services */}
        <section id="services" className="px-8 py-16">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">Services</h3>
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
              "Jira",
              "Confluence",
              "SQL",
              "Power BI",
              "Python",
              "APIs",
              "Data Modeling",
            ].map((t) => (
              <li key={t} className="rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-gray-700 dark:bg-gray-800">
                {t}
              </li>
            ))}
          </ul>
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

        {/* Testimonials */}
        <section className="px-8 py-16">
          <h3 className="text-2xl font-bold mb-6">Testimonials</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[{
              quote:
                "Jurij přinesl do projektu strukturu a jasnou komunikaci. Díky tomu jsme doručili včas a v kvalitě.",
              author: "CTO, FinTech",
            },
            {
              quote:
                "Skvělá schopnost propojit business cíle s technickým řešením a řízením rizik.",
              author: "Head of Operations, Retail",
            }].map((t) => (
              <figure key={t.author} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <blockquote className="text-gray-700 dark:text-gray-200">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400">{t.author}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-8 py-16">
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contact
          </motion.h3>
          <motion.form
            className="max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm grid gap-4 dark:border-gray-700 dark:bg-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={async (e) => {
              e.preventDefault();
              setResult(null);
              setLoading(true);
              try {
                await sendContact({ name, email, message });
                setResult({ ok: true });
                setName("");
                setEmail("");
                setMessage("");
              } catch (err: any) {
                setResult({ error: err?.message || "Failed to send" });
              } finally {
                setLoading(false);
              }
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none dark:bg-gray-900 dark:border-gray-700"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none dark:bg-gray-900 dark:border-gray-700"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-300 h-36 resize-none focus:border-teal-500 focus:outline-none dark:bg-gray-900 dark:border-gray-700"
            ></textarea>
            {result?.ok && (
              <p className="text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-md p-2 dark:text-teal-200 dark:bg-teal-900/30 dark:border-teal-800">
                Message sent. I’ll get back to you soon.
              </p>
            )}
            {result?.error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-2 dark:text-red-200 dark:bg-red-900/30 dark:border-red-800">
                {result.error}
              </p>
            )}
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </section>

        {/* Footer */}
        <footer className="px-8 py-6 bg-sky-50 text-gray-700 dark:bg-gray-800 dark:text-gray-100 text-center border-t border-gray-200 dark:border-gray-700">
          © {new Date().getFullYear()} IT Project Manager & Analyst
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
