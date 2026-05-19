import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ease = [0.76, 0, 0.24, 1];

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Read.cv", href: "https://read.cv" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ loading: false, ok: false, error: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true, ok: false, error: "" });
    try {
      await axios.post(`${API}/contact`, form);
      setState({ loading: false, ok: true, error: "" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Something went wrong. Try again.";
      setState({ loading: false, ok: false, error: String(detail) });
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0a0a0a] pt-32 pb-12"
      data-testid="contact-section"
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="label mb-6">[04] — Contact</div>

        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease }}
          viewport={{ once: true }}
          className="font-display text-white text-[16vw] sm:text-[14vw] lg:text-[12vw] leading-[0.86] tracking-[-0.04em]"
        >
          Let&apos;s
          <br />
          <span className="italic text-[var(--accent)]">talk.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 space-y-10"
            data-testid="contact-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <Field
                label="01 — Your name"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                testId="contact-name"
              />
              <Field
                label="02 — Email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                testId="contact-email"
              />
            </div>

            <div>
              <label className="label block mb-3">03 — Project / message</label>
              <textarea
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={onChange}
                data-testid="contact-message"
                className="w-full bg-transparent border-b-2 border-white/15 focus:border-[var(--accent)] py-3 text-white text-base placeholder-white/30 resize-none transition-colors"
                placeholder="Tell me a little about the idea..."
              />
            </div>

            <div className="flex items-center gap-8 pt-2">
              <button
                type="submit"
                disabled={state.loading}
                data-testid="contact-submit"
                data-cursor="send"
                className="group inline-flex items-center gap-4 border border-white/20 hover:border-[var(--accent)] hover:text-[var(--accent)] px-8 py-4 text-white label transition-colors disabled:opacity-50"
              >
                <span>{state.loading ? "Sending..." : "Send transmission"}</span>
                <span
                  className="text-base transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
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
                  className="label text-red-400"
                  data-testid="contact-error"
                >
                  {state.error}
                </span>
              )}
            </div>
          </form>

          {/* Socials / direct */}
          <aside className="lg:col-span-4 lg:col-start-9 space-y-12">
            <div>
              <div className="label mb-3">— Direct</div>
              <a
                href="mailto:hello@studio-k.dev"
                className="font-display text-white text-3xl lg:text-4xl link-underline hover:text-[var(--accent)] transition-colors"
                data-testid="contact-email-direct"
                data-cursor="copy"
              >
                hello@studio-k.dev
              </a>
            </div>

            <div>
              <div className="label mb-3">— Elsewhere</div>
              <ul className="space-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="label inline-flex items-center gap-3 text-white hover:text-[var(--accent)]"
                      data-testid={`social-${s.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    >
                      <span className="w-6 h-px bg-current" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="label">© 2026 — studio/k. all rights reserved.</span>
          <span className="label">Designed &amp; coded with attention.</span>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", required, testId }) {
  return (
    <div>
      <label className="label block mb-3">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={testId}
        className="w-full bg-transparent border-b-2 border-white/15 focus:border-[var(--accent)] py-3 text-white text-base placeholder-white/30 transition-colors"
        placeholder=" "
      />
    </div>
  );
}
