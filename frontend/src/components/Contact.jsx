import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Send, Mail, Github, Linkedin, Twitter } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ease = [0.76, 0, 0.24, 1];

const socials = [
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com", label: "GitHub" },
  { Icon: Twitter, href: "https://x.com", label: "X / Twitter" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ loading: false, ok: false, error: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      setState({ loading: false, ok: false, error: "Please enter a valid email." });
      return;
    }
    setState({ loading: true, ok: false, error: "" });
    try {
      await axios.post(`${API}/contact`, form);
      setState({ loading: false, ok: true, error: "" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "The raven could not deliver your message. Try again.";
      setState({ loading: false, ok: false, error: String(detail) });
    }
  };

  return (
    <section
      id="connect"
      className="relative py-24 sm:py-32 lg:py-40 border-t border-[var(--border)]"
      data-testid="contact-section"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="label mb-4">✦ Connect ✦</div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--fg)]">
            Send a <span className="italic text-[var(--accent)]">raven</span>
          </h2>
          <p className="mt-4 text-[var(--fg-dim)] text-sm">
            Looking to collaborate, hire, or just chat? Drop a line.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 parchment rounded-md p-7 sm:p-9 space-y-6 relative"
            data-testid="contact-form"
          >
            <span className="corner-tl" />
            <span className="corner-tr" />
            <span className="corner-bl" />
            <span className="corner-br" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                label="Your name"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                testId="contact-name"
              />
              <Field
                label="Email"
                name="email"
                type="text"
                value={form.email}
                onChange={onChange}
                required
                testId="contact-email"
              />
            </div>

            <div>
              <label className="label-dim block mb-2">Your message</label>
              <textarea
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={onChange}
                data-testid="contact-message"
                placeholder="Tell me about the idea..."
                className="w-full bg-[#0a0f24]/60 border border-[var(--border-strong)] focus:border-[var(--accent)] rounded-sm px-4 py-3 text-[var(--fg)] text-sm placeholder-[var(--muted)] resize-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              <button
                type="submit"
                disabled={state.loading}
                data-testid="contact-submit"
                data-cursor="send"
                className="btn-quest disabled:opacity-60"
              >
                <Send size={14} />
                {state.loading ? "Sending..." : "Release the raven"}
              </button>
              {state.ok && (
                <span
                  className="label text-[var(--accent)]"
                  data-testid="contact-success"
                >
                  ✓ Message received. Talk soon.
                </span>
              )}
              {state.error && (
                <span
                  className="text-red-400 text-xs font-mono uppercase tracking-wider"
                  data-testid="contact-error"
                >
                  {state.error}
                </span>
              )}
            </div>
          </form>

          {/* Side info */}
          <aside className="lg:col-span-5 space-y-8">
            <div className="parchment rounded-md p-7 relative">
              <span className="corner-tl" />
              <span className="corner-tr" />
              <span className="corner-bl" />
              <span className="corner-br" />
              <div className="label mb-3">Direct</div>
              <a
                href="mailto:hello@wanderer.dev"
                className="inline-flex items-center gap-3 font-display text-2xl lg:text-3xl text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                data-testid="contact-email-direct"
              >
                <Mail size={20} />
                hello@wanderer.dev
              </a>
              <p className="mt-3 text-[var(--fg-dim)] text-sm">
                Usually replies within 24 hours, except on quests.
              </p>
            </div>

            <div className="parchment rounded-md p-7 relative">
              <span className="corner-tl" />
              <span className="corner-tr" />
              <span className="corner-bl" />
              <span className="corner-br" />
              <div className="label mb-4">Elsewhere</div>
              <ul className="space-y-3">
                {socials.map(({ Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                      data-testid={`social-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    >
                      <Icon size={16} className="text-[var(--accent)]" />
                      <span className="text-sm">{label}</span>
                      <span className="text-xs label-dim opacity-0 group-hover:opacity-100 transition-opacity">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span className="label-dim">© 2026 — The Wanderer. Be kind out there.</span>
          <span className="label-dim">Crafted by candlelight. Coded with care.</span>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", required, testId }) {
  return (
    <div>
      <label className="label-dim block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={testId}
        className="w-full bg-[#0a0f24]/60 border border-[var(--border-strong)] focus:border-[var(--accent)] rounded-sm px-4 py-3 text-[var(--fg)] text-sm placeholder-[var(--muted)] transition-colors"
      />
    </div>
  );
}
