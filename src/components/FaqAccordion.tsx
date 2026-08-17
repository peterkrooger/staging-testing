import { useState } from "react";
import { FAQS } from "../data/mockBooking";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq">
      {FAQS.map((item, i) => {
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