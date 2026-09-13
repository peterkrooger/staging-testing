import { useState, FormEvent } from "react";

type Errors = {
  name?: string;
  email?: string;
  description?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AISupportRequest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) {
      next.email = "Please enter your email.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!description.trim()) {
      next.description = "Please describe the problem you have.";
    }
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      // No backend contract yet — simulate the request round-trip so the
      // loading state is real. Swap this for the API call when it exists.
      await new Promise((r) => setTimeout(r, 700));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setName("");
    setEmail("");
    setDescription("");
    setErrors({});
    setSubmitted(false);
  }

  const fieldBase =
    "w-full rounded-lg bg-white/[0.06] px-4 py-3 text-[15px] text-white " +
    "placeholder-white/30 outline-none border transition-colors " +
    "focus:border-blue-500 focus:bg-white/[0.09] focus:ring-1 focus:ring-blue-500/50 " +
    "disabled:opacity-60";

  return (
    <div
      className="relative min-h-screen w-full font-serif text-white"
      style={{
        backgroundImage: "url('/an-abstract-image-ddc3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900/80 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          {submitted ? (
            <section aria-live="polite">
              <h1 className="font-display text-3xl font-semibold leading-tight">
                Thanks, {name.trim() || "there"}.
              </h1>
              <p className="mt-4 text-white/70">
                Your AI Support request has been received. Our team will get back
                to you at <span className="text-white">{email.trim()}</span>{" "}
                shortly.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-lg border border-white/20 px-5 py-2.5 text-white/80 transition-colors hover:bg-white/10"
              >
                Submit another request
              </button>
            </section>
          ) : (
            <>
              <header className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                  Wavelave · AI Support
                </p>
                <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  Request AI Support
                </h1>
                <p className="mt-3 text-[15px] text-white/60">
                  Tell us what you need help with and our team will follow up.
                </p>
              </header>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm text-white/80"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={submitting}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`${fieldBase} ${
                      errors.name ? "border-red-400" : "border-white/10"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-white/80"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={submitting}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${fieldBase} ${
                      errors.email ? "border-red-400" : "border-white/10"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm text-white/80"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the problem you have…"
                    rows={4}
                    disabled={submitting}
                    aria-invalid={!!errors.description}
                    aria-describedby={
                      errors.description ? "description-error" : undefined
                    }
                    className={`${fieldBase} resize-none ${
                      errors.description ? "border-red-400" : "border-white/10"
                    }`}
                  />
                  {errors.description && (
                    <p
                      id="description-error"
                      className="mt-1.5 text-sm text-red-400"
                    >
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-white/40">All fields are required.</p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-lg bg-blue-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}