import React from "react";
import { motion } from "framer-motion";
import { pricing } from "../data/pricing";
import type { PricingItem } from "../data/pricing";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Ceník</h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
          Orientační ceny pro standardní projekt o délce přibližně 6 měsíců s týmem do 6 lidí. 
          Rád připravím přesnější nabídku po krátké úvodní konzultaci.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {pricing.map((p) => (
          <motion.div
            key={p.title}
            variants={itemVariants}
            className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <h4 className="text-lg font-semibold mb-2 leading-snug">{p.title}</h4>
            <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 mb-3">{p.price}</div>
            {p.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">{p.description}</p>
            )}
            {p.note && (
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">{p.note}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 max-w-3xl">
        * Uvedené částky představují typický rámec – konečná cena se může lišit dle složitosti, 
        objemu scope, integrační náročnosti nebo specifických požadavků na reporting a compliance.
      </div>
    </section>
  );
};

export default PricingSection;
