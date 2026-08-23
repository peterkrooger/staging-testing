// Per-property content + pricing for the multi-property booking site.
// Each Property bundles everything the splash + booking widget need to render.

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

export interface Highlight {
  icon: string;
  title: string;
  body: string;
}

export interface GalleryTile {
  tag: string;
  emoji: string;
}

export interface DriveTime {
  place: string;
  time: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Property {
  id: string;
  navLabel: string; // short label for the switcher, e.g. "Bradenton, FL"
  brand: string; // logo text
  heroImage: string; // path served from /public
  heroTitle: string;
  heroSubtitle: string;
  bookCta: string;
  pricing: PricingRules;
  blockedDates: string[]; // ISO yyyy-mm-dd
  highlights: Highlight[];
  gallery: GalleryTile[];
  driveTimes: DriveTime[];
  faqs: Faq[];
  confirmationLine: string; // e.g. "We can't wait to host you in Bradenton."
  footerLine: string;
}

const bradenton: Property = {
  id: "bradenton",
  navLabel: "Bradenton, FL",
  brand: "Sunshine Bradenton",
  heroImage: "/make-this-image-here-is-a-refined-direct-8186.jpg",
  heroTitle: "Family-Friendly Sunshine Getaway in Bradenton",
  heroSubtitle:
    "Private heated pool, brand-new mini-golf course, and full beach gear — just 20 minutes to Anna Maria Island beaches.",
  bookCta: "Book Direct & Save",
  pricing: {
    baseNightlyRate: 289,
    monthlyNightlyRate: 189,
    cleaningFee: 175,
    taxRate: 0.13,
    directBookingSavingsRate: 0.15,
    minNights: 2,
    extendedMinNights: 30,
  },
  blockedDates: [
    "2025-07-04",
    "2025-07-05",
    "2025-07-06",
    "2025-08-15",
    "2025-08-16",
    "2025-12-24",
    "2025-12-25",
    "2025-12-26",
  ],
  highlights: [
    {
      icon: "🏊",
      title: "Private Heated Pool",
      body: "Fully fenced backyard with a heated pool — swim year-round, day or night.",
    },
    {
      icon: "⛳",
      title: "Brand-New Mini-Golf",
      body: "Your own putting green in the backyard — hours of fun for all ages.",
    },
    {
      icon: "🏖️",
      title: "Full Beach Gear",
      body: "Chairs, umbrellas, coolers & toys ready to go — 20 min to the Gulf.",
    },
    {
      icon: "💻",
      title: "Family & Work Friendly",
      body: "Fast Wi-Fi, workstation, pack-and-play & high chair.",
    },
  ],
  gallery: [
    { tag: "Pool & Backyard", emoji: "🏊" },
    { tag: "Living Areas", emoji: "🛋️" },
    { tag: "Bedrooms", emoji: "🛏️" },
    { tag: "Beach Gear", emoji: "🏖️" },
    { tag: "Mini-Golf", emoji: "⛳" },
    { tag: "Kitchen", emoji: "🍳" },
  ],
  driveTimes: [
    { place: "Anna Maria Island / Gulf Beaches", time: "20 min" },
    { place: "SRQ Airport", time: "15 min" },
    { place: "Downtown Bradenton & Riverwalk", time: "10 min" },
    { place: "Groceries, dining & parks", time: "5 min" },
  ],
  faqs: [
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
  ],
  confirmationLine: "We can't wait to host you in Bradenton.",
  footerLine: "Sunshine Bradenton · Book direct for the best rate · Instant confirmation",
};

const savannah: Property = {
  id: "savannah",
  navLabel: "Tybee Island / Savannah, GA",
  brand: "Tybee Coastal Getaway",
  heroImage: "/savannah-hero.jpg",
  heroTitle: "Breezy Beach House on Tybee Island",
  heroSubtitle:
    "Sun-soaked coastal escape steps from the sand — with historic Savannah just 20 minutes away for dining, tours & charm.",
  bookCta: "Book Your Tybee Getaway",
  pricing: {
    baseNightlyRate: 265,
    monthlyNightlyRate: 175,
    cleaningFee: 165,
    taxRate: 0.13,
    directBookingSavingsRate: 0.15,
    minNights: 2,
    extendedMinNights: 30,
  },
  blockedDates: [
    "2025-07-04",
    "2025-07-05",
    "2025-09-01",
    "2025-11-27",
    "2025-11-28",
    "2025-12-31",
  ],
  highlights: [
    {
      icon: "🏖️",
      title: "Minutes to the Beach",
      body: "Stroll to Tybee Island's wide sandy beaches — grab the beach gear and go.",
    },
    {
      icon: "🏛️",
      title: "Historic Savannah Nearby",
      body: "A 20-minute drive to downtown Savannah's squares, dining & guided tours.",
    },
    {
      icon: "🌅",
      title: "Coastal Outdoor Living",
      body: "Breezy porches and deck for morning coffee and sunset lowcountry evenings.",
    },
    {
      icon: "🚿",
      title: "Beach-Ready & Family Friendly",
      body: "Outdoor shower, beach gear, fast Wi-Fi & an easy layout for the whole crew.",
    },
  ],
  gallery: [
    { tag: "Porch & Deck", emoji: "🌅" },
    { tag: "Living Areas", emoji: "🛋️" },
    { tag: "Bedrooms", emoji: "🛏️" },
    { tag: "Beach Access", emoji: "🏖️" },
    { tag: "Outdoor Shower", emoji: "🚿" },
    { tag: "Kitchen", emoji: "🍳" },
  ],
  driveTimes: [
    { place: "Tybee Island Beach", time: "5 min" },
    { place: "Historic Downtown Savannah", time: "20 min" },
    { place: "Savannah/Hilton Head Airport (SAV)", time: "30 min" },
    { place: "Groceries, dining & shops", time: "5 min" },
  ],
  faqs: [
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
      q: "How far is the beach and downtown Savannah?",
      a: "The beach is a short walk or 5-minute drive, and historic downtown Savannah is about 20 minutes away.",
    },
    {
      q: "Do you offer discounts for 30+ night stays?",
      a: "Yes! Stays of 30 nights or more automatically receive our extended-stay nightly rate — great for snowbirds and remote professionals.",
    },
  ],
  confirmationLine: "We can't wait to host you on Tybee Island.",
  footerLine: "Tybee Coastal Getaway · Book direct for the best rate · Instant confirmation",
};

export const PROPERTIES: Property[] = [bradenton, savannah];

export function getProperty(id: string): Property {
  return PROPERTIES.find((p) => p.id === id) ?? bradenton;
}