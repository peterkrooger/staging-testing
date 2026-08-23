// Availability + pricing lookup, parameterized per property.

import type { PricingRules, StayType } from "./properties";

export type { StayType };

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

// Simulates an async availability + pricing lookup for a given property.
export function checkAvailability(
  pricing: PricingRules,
  blockedDates: string[],
  checkIn: string,
  checkOut: string,
  guests: number,
): Promise<AvailabilityResult> {
  const blocked = new Set(blockedDates);
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

      const stayType: StayType = nights >= pricing.extendedMinNights ? "extended" : "short";
      if (stayType === "short" && nights < pricing.minNights) {
        return resolve({ ok: false, reason: `Minimum stay is ${pricing.minNights} nights.` });
      }

      const conflict = eachDate(checkIn, checkOut).find((d) => blocked.has(d));
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
        stayType === "extended" ? pricing.monthlyNightlyRate : pricing.baseNightlyRate;
      const subtotal = nightlyRate * nights;
      const taxes = Math.round((subtotal + pricing.cleaningFee) * pricing.taxRate);
      const total = subtotal + pricing.cleaningFee + taxes;
      const otaTotal = Math.round(total / (1 - pricing.directBookingSavingsRate));

      resolve({
        ok: true,
        quote: {
          stayType,
          nights,
          nightlyRate,
          subtotal,
          cleaningFee: pricing.cleaningFee,
          taxes,
          total,
          otaTotal,
          savings: otaTotal - total,
        },
      });
    }, 700);
  });
}