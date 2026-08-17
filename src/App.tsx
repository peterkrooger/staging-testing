import BookingWidget from "./components/BookingWidget";
import FaqAccordion from "./components/FaqAccordion";
import { HIGHLIGHTS, DRIVE_TIMES } from "./data/mockBooking";
import "./App.css";

const GALLERY = [
  { tag: "Pool & Backyard", emoji: "🏊" },
  { tag: "Living Areas", emoji: "🛋️" },
  { tag: "Bedrooms", emoji: "🛏️" },
  { tag: "Beach Gear", emoji: "🏖️" },
  { tag: "Mini-Golf", emoji: "⛳" },
  { tag: "Kitchen", emoji: "🍳" },
];

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <span className="logo">Sunshine Bradenton</span>
          <a className="nav-cta" href="#book">
            Book Direct
          </a>
        </nav>
        <div className="hero-inner">
          <h1>Family-Friendly Sunshine Getaway in Bradenton</h1>
          <p>
            Private heated pool, brand-new mini-golf course, and full beach gear —
            just 20 minutes to Anna Maria Island beaches.
          </p>
        </div>
        <BookingWidget />
      </header>

      <main>
        <section className="highlights">
          {HIGHLIGHTS.map((h) => (
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
            {GALLERY.map((g) => (
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
            {DRIVE_TIMES.map((d) => (
              <div className="drive-card" key={d.place}>
                <span className="drive-time">{d.time}</span>
                <span className="drive-place">{d.place}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>House Rules & FAQ</h2>
          <FaqAccordion />
        </section>
      </main>

      <footer className="footer">
        <p>Sunshine Bradenton · Book direct for the best rate · Instant confirmation</p>
      </footer>
    </div>
  );
}