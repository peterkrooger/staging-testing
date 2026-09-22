import React from "react";
import Hero from "./components/Hero";
import BookingForm from "./components/BookingForm";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-md">
          <h2 className="font-playfair text-3xl text-white mb-2" style={{ fontWeight: 700 }}>
            Book your stay
          </h2>
          <p className="font-source-serif text-gray-300 mb-6">
            Private pool and on-site mini golf, minutes from Tampa &amp; Bradenton.
            {/* Copy placeholder — @peterekrueger to supply final copy. */}
          </p>
          <BookingForm />
        </div>
      </section>
    </main>
  );
}