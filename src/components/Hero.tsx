import React from "react";

type HeroProps = {
  /** Path to the hero image. Served from public/ at the site root. */
  imageSrc?: string;
  /** Alt text — the image has baked-in marketing copy, so describe both scene + text. */
  alt?: string;
};

/**
 * Full-bleed hero. The image ships with the headline/subtitle baked in,
 * so we render it as a plain <img> (no HTML text overlay) for correct
 * scaling, SEO-friendly alt text, and a good LCP.
 */
export default function Hero({
  imageSrc = "/a-wide-realistic-aerial-style-photograph-025c.png",
  alt = "Southern Florida vacation rental — private pool and on-site mini golf, between Tampa and Bradenton",
}: HeroProps) {
  return (
    <section aria-label="Property hero" className="w-full">
      <img
        src={imageSrc}
        alt={alt}
        // Hero is the LCP element — hint the browser to load it first.
        fetchPriority="high"
        decoding="async"
        className="block w-full h-auto object-cover"
      />
    </section>
  );
}