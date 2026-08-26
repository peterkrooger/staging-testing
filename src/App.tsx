import { useState } from "react";
import BookingWidget from "./components/BookingWidget";
import FaqAccordion from "./components/FaqAccordion";
import { PROPERTIES, getProperty } from "./data/properties";
import "./App.css";

export default function App() {
  const [propertyId, setPropertyId] = useState(PROPERTIES[0].id);
  const property = getProperty(propertyId);

  return (
    <div className="page">
      <header
        className="hero"
        style={{
          backgroundImage: `linear-gradient(150deg, rgba(26, 143, 178, 0.68) 0%, rgba(20, 48, 58, 0.8) 100%), url("${property.heroImage}")`,
        }}
      >
        <nav className="nav">
          <span className="logo">{property.brand}</span>
          <div className="nav-right">
            {PROPERTIES.length > 1 && (
              <select
                className="prop-switch"
                aria-label="Choose a property"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
              >
                {PROPERTIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.navLabel}
                  </option>
                ))}
              </select>
            )}
            <a className="nav-cta" href="#book">
              Book Direct
            </a>
          </div>
        </nav>
        <div className="hero-inner">
          <h1>{property.heroTitle}</h1>
          <p>{property.heroSubtitle}</p>
        </div>
        <BookingWidget property={property} />
      </header>

      <main>
        <section className="highlights">
          {property.highlights.map((h) => (
            <div className="highlight-card" key={h.title}>
              <span className="hl-icon">{h.icon}</span>
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </div>
          ))}
        </section>

        <section className="section">
          <h2>Take a Look Around</h2>
          <div className="gallery">
            {property.gallery.map((g) => (
              <figure className="gallery-tile" key={g.tag}>
                <span className="tile-emoji">{g.emoji}</span>
                <figcaption>{g.tag}</figcaption>
              </figure>
            ))}
          </div>
          <p className="note">Photo gallery placeholder — swap tiles for real images.</p>
        </section>

        <section className="section location">
          <h2>Perfectly Located</h2>
          <div className="drive-cards">
            {property.driveTimes.map((d) => (
              <div className="drive-card" key={d.place}>
                <span className="drive-time">{d.time}</span>
                <span className="drive-place">{d.place}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>House Rules & FAQ</h2>
          <FaqAccordion faqs={property.faqs} />
        </section>
      </main>

      <footer className="footer">
        <p>{property.footerLine}</p>
      </footer>
    </div>
  );
}