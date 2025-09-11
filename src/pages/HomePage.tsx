// 📁 src/pages/HomePage.tsx
import React, { FC } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";

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


  return (
  <div className="min-h-screen bg-slate-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
  <Navbar />

        {/* Hero Section */}
  <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gradient-to-r from-sky-50 to-teal-50 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
          <motion.div 
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">IT Project Manager & Business Analyst</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">Řídím projekty, které spojují technologie a byznys.</p>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white transition">Contact Me</Button>
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/portrait.png"
              alt="Professional portrait"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
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
          <h3 className="text-2xl font-bold mb-6">Services</h3>
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

        {/* Portfolio */}
  <section id="portfolio" className="px-8 py-16 bg-white/70 dark:bg-gray-700">
          <motion.h3
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Portfolio
          </motion.h3>
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

        {/* Contact */}
        <section id="contact" className="px-8 py-16">
          <motion.h3 
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contact
          </motion.h3>
          <motion.form 
            className="grid gap-4 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <input type="text" placeholder="Your Name" className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
            <input type="email" placeholder="Your Email" className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
            <textarea placeholder="Message" className="p-2 border rounded h-32 dark:bg-gray-800 dark:border-gray-600"></textarea>
            <Button type="submit" className="bg-teal-500 hover:bg-teal-600 transition">Send Message</Button>
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
