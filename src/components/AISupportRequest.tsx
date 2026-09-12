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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
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
    "w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-white/40 " +
    "outline-none border transition-colors focus:border-blue-400 " +
    "focus:bg-white/10";

  return (
    <div
      className="relative min-h-screen w-full font-serif text-white"
      style={{
        backgroundImage: "url('/an-abstract-image-ddc3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
        {submitted ? (
          <section
            className="rounded-2xl bg-white/5 p-8 text-center backdrop-blur-sm"
            aria-live="polite"
          >
            <h1 className="text-3xl font-semibold">Thanks, {name.trim() || "there"}.</h1>
            <p className="mt-3 text-white/70">
              Your AI Support request has been received. Our team will get back to
              you at{" "}
              <span className="text-white">{email.trim()}</span> shortly.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-lg border border-white/20 px-5 py-2.5 text-white/80 transition-colors hover:bg-white/10"
            >
              Submit another request
            </button>
          </section>
        ) : (
          <>
            <header className="mb-8">
              <h1 className="text-4xl font-semibold leading-tight">
                Request AI Support
              </h1>
              <p className="mt-3 text-white/70">
                Tell us what you need help with and our team will follow up.
              </p>
            </header>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-white/80">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${fieldBase} ${
                    errors.name ? "border-red-400" : "border-white/10"
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-red-300">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-white/80">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${fieldBase} ${
                    errors.email ? "border-red-400" : "border-white/10"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="description" className="mb-2 block text-sm text-white/80">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the problem you have."
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? "description-error" : undefined}
                  className={`${fieldBase} ${
                    errors.description ? "border-red-400" : "border-white/10"
                  }`}
                />
                {errors.description && (
                  <p id="description-error" className="mt-1.5 text-sm text-red-300">
                    {errors.description}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-white transition-colors hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}