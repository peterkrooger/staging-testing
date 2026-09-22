import React, { useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-md bg-gray-800 text-white placeholder-gray-400 " +
  "border border-gray-700 px-3 py-2 font-source-serif " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

/** Today's date as YYYY-MM-DD for min= on the date inputs. */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function BookingForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const minCheckOut = useMemo(
    () => (checkIn ? checkIn : today()),
    [checkIn]
  );

  function validate(): string | null {
    if (!checkIn || !checkOut) return "Please select both check-in and check-out dates.";
    if (checkOut <= checkIn) return "Check-out must be after check-in.";
    if (guests < 1) return "At least one guest is required.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("submitting");
    try {
      // TODO(backend): wire this to the real availability endpoint.
      // Owner of the booking API contract — @peterekrueger to confirm who.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
    } catch {
      setError("Something went wrong checking availability. Please try again.");
      setStatus("error");
    }
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-md w-full space-y-4"
      aria-describedby="booking-status"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="check-in" className="text-sm text-gray-200 font-source-serif">
            Check-in
          </label>
          <input
            id="check-in"
            type="date"
            value={checkIn}
            min={today()}
            onChange={(e) => setCheckIn(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="check-out" className="text-sm text-gray-200 font-source-serif">
            Check-out
          </label>
          <input
            id="check-out"
            type="date"
            value={checkOut}
            min={minCheckOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="guests" className="text-sm text-gray-200 font-source-serif">
          Guests
        </label>
        <input
          id="guests"
          type="number"
          min={1}
          max={16}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className={inputClass}
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md px-4 py-3 font-source-serif text-white
                   bg-[#3B82F6] hover:bg-blue-600 transition-colors
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Checking availability…" : "Check availability"}
      </button>

      {/* Loading / empty / error / success — announced to screen readers. */}
      <div id="booking-status" aria-live="polite" className="min-h-[1.25rem]">
        {status === "error" && error && (
          <p className="text-red-300 text-sm">{error}</p>
        )}
        {status === "success" && (
          <p className="text-green-300 text-sm">
            Dates are available — booking flow coming soon.
          </p>
        )}
      </div>
    </form>
  );
}