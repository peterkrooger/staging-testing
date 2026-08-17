import { useState } from "react";
import {
  checkAvailability,
  PRICING,
  type Quote,
  type StayType,
} from "../data/mockBooking";

type Status = "idle" | "loading" | "quoted" | "error" | "confirmed";

function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function BookingWidget() {
  const [stayType, setStayType] = useState<StayType>("short");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [quote, setQuote] = useState<Quote | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setQuote(null);
    const result = await checkAvailability(checkIn, checkOut, guests);
    if (result.ok) {
      setQuote(result.quote);
      setStatus("quoted");
    } else {
      setError(result.reason);
      setStatus("error");
    }
  }

  function handleBook() {
    // Mock booking submission — real payment/PMS wiring is a backend task.
    setStatus("confirmed");
  }

  return (
    <section className="booking" id="book">
      <form className="booking-bar" onSubmit={handleCheck}>
        <div className="stay-toggle" role="tablist" aria-label="Stay type">
          <button
            type="button"
            role="tab"
            aria-selected={stayType === "short"}
            className={stayType === "short" ? "active" : ""}
            onClick={() => setStayType("short")}
          >
            Short Stay
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={stayType === "extended"}
            className={stayType === "extended" ? "active" : ""}
            onClick={() => setStayType("extended")}
          >
            30+ Night Stay
          </button>
        </div>

        <label className="field">
          <span>Check-in</span>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Check-out</span>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Guests</span>
          <input
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </label>

        <button className="cta" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Checking…" : "Book Direct & Save"}
        </button>
      </form>

      {stayType === "extended" && (
        <p className="hint">
          Extended stays of {PRICING.extendedMinNights}+ nights unlock our discounted
          nightly rate — ideal for snowbirds & remote pros.
        </p>
      )}

      {/* Result states */}
      {status === "loading" && (
        <div className="quote-panel skeleton" aria-live="polite">
          <div className="skel-line" />
          <div className="skel-line" />
          <div className="skel-line short" />
        </div>
      )}

      {status === "error" && (
        <div className="quote-panel error" role="alert">
          <p>{error}</p>
          <button type="button" className="link" onClick={() => setStatus("idle")}>
            Try again
          </button>
        </div>
      )}

      {status === "quoted" && quote && (
        <div className="quote-panel" aria-live="polite">
          {quote.stayType === "extended" && (
            <span className="badge">Extended-stay rate applied 🎉</span>
          )}
          <ul className="quote-lines">
            <li>
              <span>
                {money(quote.nightlyRate)} × {quote.nights} nights
              </span>
              <span>{money(quote.subtotal)}</span>
            </li>
            <li>
              <span>Cleaning fee</span>
              <span>{money(quote.cleaningFee)}</span>
            </li>
            <li>
              <span>Taxes & fees</span>
              <span>{money(quote.taxes)}</span>
            </li>
            <li className="total">
              <span>Total</span>
              <span>{money(quote.total)}</span>
            </li>
          </ul>
          <p className="savings">
            You save <strong>{money(quote.savings)}</strong> vs. booking on Airbnb/VRBO.
          </p>
          <button type="button" className="cta full" onClick={handleBook}>
            Reserve Now — Instant Confirmation
          </button>
        </div>
      )}

      {status === "confirmed" && (
        <div className="quote-panel confirmed" role="status">
          <h3>You're booked! 🌴</h3>
          <p>
            A confirmation email is on its way. We can't wait to host you in Bradenton.
          </p>
          <button
            type="button"
            className="link"
            onClick={() => {
              setStatus("idle");
              setQuote(null);
            }}
          >
            Start a new search
          </button>
        </div>
      )}
    </section>
  );
}