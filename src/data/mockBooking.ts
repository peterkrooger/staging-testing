// Mock booking data + pricing logic for Bradenton v1 (no real PMS).

export type StayType = "short" | "extended";

export interface PricingRules {
  baseNightlyRate: number; // short-stay nightly rate
  monthlyNightlyRate: number; // discounted nightly rate for 30+ night stays
  cleaningFee: number;
  taxRate: number; // as a fraction, e.g. 0.13
  directBookingSavingsRate: number; // shown vs. OTAs, e.g. 0.15
  minNights: number;
  extendedMinNights: number; // 30
}

export const PRICING: PricingRules = {
  baseNightlyRate: 289,
  monthlyNightlyRate: 189,
  cleaningFee: 175,
  taxRate: 0.13,
  directBookingSavingsRate: 0.15,
  minNights: 2,
  extendedMinNights: 30,
};

// Dates that are already booked (ISO yyyy-mm-dd). Simulates a PMS calendar.
export const BLOCKED_DATES: Set<string> = new Set([
  "2025-07-04",
  "2025-07-05",
  "2025-07-06",
  "2025-08-15",
  "2025-08-16",
  "2025-12-24",
  "2025-12-25",
  "2025-12-26",
]);

export interface Quote {
  stayType: StayType;
  nights: number;
  nightlyRate: number;
  subtotal: number;
  cleaningFee: number;
  taxes: number;
  total: number;
  otaTotal: number; // simulated OTA total for savings callout
  savings: number;
}

function daysBetween(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn + "T00:00:00");
  const end = new Date(checkOut + "T00:00:00");
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

function eachDate(checkIn: string, checkOut: string): string[] {
  const out: string[] = [];
  const d = new Date(checkIn + "T00:00:00");
  const end = new Date(checkOut + "T00:00:00");
  while (d < end) {
    out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export type AvailabilityResult =
  | { ok: true; quote: Quote }
  | { ok: false; reason: string };

// Simulates an async availability + pricing lookup.
export function checkAvailability(
  checkIn: string,
  checkOut: string,
  guests: number,
): Promise<AvailabilityResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!checkIn || !checkOut) {
        return resolve({ ok: false, reason: "Please select check-in and check-out dates." });
      }
      const nights = daysBetween(checkIn, checkOut);
      if (nights <= 0) {
        return resolve({ ok: false, reason: "Check-out must be after check-in." });
      }
      if (guests < 1) {
        return resolve({ ok: false, reason: "Add at least one guest." });
      }

      const stayType: StayType = nights >= PRICING.extendedMinNights ? "extended" : "short";
      if (stayType === "short" && nights < PRICING.minNights) {
        return resolve({ ok: false, reason: `Minimum stay is ${PRICING.minNights} nights.` });
      }

      const conflict = eachDate(checkIn, checkOut).find((d) => BLOCKED_DATES.has(d));
      if (conflict) {
        return resolve({
          ok: false,
          reason: `Sorry, ${conflict} is already booked. Try different dates.`,
        });
      }

      // Simulate an occasional network error so the UI handles it.
      if (Math.random() < 0.05) {
        return resolve({ ok: false, reason: "Something went wrong. Please try again." });
      }

      const nightlyRate =
        stayType === "extended" ? PRICING.monthlyNightlyRate : PRICING.baseNightlyRate;
      const subtotal = nightlyRate * nights;
      const taxes = Math.round((subtotal + PRICING.cleaningFee) * PRICING.taxRate);
      const total = subtotal + PRICING.cleaningFee + taxes;
      const otaTotal = Math.round(total / (1 - PRICING.directBookingSavingsRate));

      resolve({
        ok: true,
        quote: {
          stayType,
          nights,
          nightlyRate,
          subtotal,
          cleaningFee: PRICING.cleaningFee,
          taxes,
          total,
          otaTotal,
          savings: otaTotal - total,
        },
      });
    }, 700);
  });
}

export const HIGHLIGHTS = [
  {
    icon: "🏊",
    title: "Private Heated Pool",
    body: "Fully fenced outdoor oasis, heated year-round.",
  },
  {
    icon: "⛳",
    title: "Private Mini-Golf",
    body: "Custom putt-putt green right in the backyard.",
  },
  {
    icon: "🏖️",
    title: "Beach Ready",
    body: "Chairs, umbrellas, cart & cooler. 20 min to the Gulf.",
  },
  {
    icon: "💻",
    title: "Family & Work Friendly",
    body: "Fast Wi-Fi, workstation, pack-and-play & high chair.",
  },
];

export const DRIVE_TIMES = [
  { place: "Anna Maria Island / Gulf Beaches", time: "20 min" },
  { place: "SRQ Airport", time: "15 min" },
  { place: "Downtown Bradenton & Riverwalk", time: "10 min" },
  { place: "Groceries, dining & parks", time: "5 min" },
];

export const FAQS = [
  {
    q: "Do you offer instant confirmation?",
    a: "Yes. Book direct and you'll receive an instant confirmation email — no waiting on a host to approve.",
  },
  {
    q: "What's the cancellation policy?",
    a: "Full refund up to 14 days before check-in. 50% refund up to 7 days prior. Non-refundable within 7 days.",
  },
  {
    q: "Are pets allowed?",
    a: "Well-behaved dogs are welcome with a $150 pet fee. Please let us know at booking.",
  },
  {
    q: "What are the quiet hours & pool rules?",
    a: "Quiet hours are 10pm–8am. The pool is unfenced from the patio — children must be supervised at all times.",
  },
  {
    q: "Do you offer discounts for 30+ night stays?",
    a: "Yes! Stays of 30 nights or more automatically receive our extended-stay nightly rate — great for snowbirds and remote professionals.",
  },
];