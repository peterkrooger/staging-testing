import { useState } from "react";
import type { Faq } from "../data/properties";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q}>
            <button
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="chev">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <p className="faq-a">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}