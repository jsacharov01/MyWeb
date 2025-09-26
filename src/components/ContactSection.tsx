import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { sendContact } from "../lib/contact";

const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok?: boolean; error?: string } | null>(null);

  const isOk = !!result?.ok;
  const errorMsg = result?.error;

  return (
    <section id="contact" className="px-8 py-16">
      <motion.h3
        className="text-2xl md:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Kontakt
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
          placeholder="Vaše jméno"
            value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          type="email"
          placeholder="Váš email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none dark:bg-gray-900 dark:border-gray-700"
        />
        <textarea
          placeholder="Zpráva"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 h-36 resize-none focus:border-teal-500 focus:outline-none dark:bg-gray-900 dark:border-gray-700"
        ></textarea>
        {isOk && (
          <p className="text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-md p-2 dark:text-teal-200 dark:bg-teal-900/30 dark:border-teal-800">
            Zpráva odeslána. Ozvu se vám brzy.
          </p>
        )}
        {errorMsg && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-2 dark:text-red-200 dark:bg-red-900/30 dark:border-red-800">
            {errorMsg}
          </p>
        )}
        <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white">
          {loading ? "Odesílání..." : "Odeslat zprávu"}
        </Button>
      </motion.form>
    </section>
  );
};

export default ContactSection;
