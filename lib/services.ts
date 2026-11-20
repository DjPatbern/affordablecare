export type AvailabilitySlot = {
  id: string;
  label: string;
  dateLabel: string;
  startsAt: string;
};
export type Clinic = {
  id: string;
  name: string;
  location: string;
  address: string;
  timezone: string;
};
export type Service = {
  id: string;
  name: string;
  category: "Primary care" | "Diagnostics" | "Wellness";
  description: string;
  longDescription: string;
  durationMinutes: number;
  priceMinor: number;
  currency: "NGN";
  clinic: Clinic;
  availability: AvailabilitySlot[];
  featured: boolean;
};
export const services: Service[] = [
  {
    id: "general-consultation",
    name: "General consultation",
    category: "Primary care",
    description:
      "Discuss a new or ongoing health concern with a qualified clinician.",
    longDescription:
      "A general consultation gives you time to discuss symptoms, routine concerns, and appropriate next steps with a qualified clinician. The clinic may recommend follow-up care or tests when needed.",
    durationMinutes: 30,
    priceMinor: 800000,
    currency: "NGN",
    featured: true,
    clinic: {
      id: "harbour-family-clinic",
      name: "Harbour Family Clinic",
      location: "Lekki, Lagos",
      address: "18 Admiralty Way, Lekki Phase 1, Lagos",
      timezone: "Africa/Lagos",
    },
    availability: [
      {
        id: "gc-1",
        dateLabel: "Today",
        label: "2:30 PM",
        startsAt: "2026-11-12T14:30:00+01:00",
      },
      {
        id: "gc-2",
        dateLabel: "Today",
        label: "4:00 PM",
        startsAt: "2026-11-12T16:00:00+01:00",
      },
      {
        id: "gc-3",
        dateLabel: "Tomorrow",
        label: "9:30 AM",
        startsAt: "2026-11-13T09:30:00+01:00",
      },
    ],
  },
  {
    id: "malaria-screening",
    name: "Malaria screening",
    category: "Diagnostics",
    description:
      "Prompt malaria testing with a clear result and clinic guidance.",
    longDescription:
      "A clinic-led malaria screening for people with relevant symptoms or exposure concerns. Results and recommended next steps are explained by the clinic team.",
    durationMinutes: 20,
    priceMinor: 450000,
    currency: "NGN",
    featured: true,
    clinic: {
      id: "mainland-diagnostics",
      name: "Mainland Diagnostics",
      location: "Yaba, Lagos",
      address: "42 Herbert Macaulay Way, Yaba, Lagos",
      timezone: "Africa/Lagos",
    },
    availability: [
      {
        id: "ms-1",
        dateLabel: "Today",
        label: "3:15 PM",
        startsAt: "2026-11-12T15:15:00+01:00",
      },
      {
        id: "ms-2",
        dateLabel: "Tomorrow",
        label: "8:30 AM",
        startsAt: "2026-11-13T08:30:00+01:00",
      },
    ],
  },
  {
    id: "womens-wellness",
    name: "Women’s wellness visit",
    category: "Wellness",
    description:
      "A private preventive-health conversation tailored to your stage of life.",
    longDescription:
      "A preventive wellness visit focused on questions, routine checks, and health priorities. Specific services may vary, so contact the clinic if you need a particular screening.",
    durationMinutes: 45,
    priceMinor: 1200000,
    currency: "NGN",
    featured: true,
    clinic: {
      id: "cedar-womens-centre",
      name: "Cedar Women’s Centre",
      location: "Ikeja, Lagos",
      address: "7 Allen Avenue, Ikeja, Lagos",
      timezone: "Africa/Lagos",
    },
    availability: [
      {
        id: "ww-1",
        dateLabel: "Tomorrow",
        label: "10:00 AM",
        startsAt: "2026-11-13T10:00:00+01:00",
      },
      {
        id: "ww-2",
        dateLabel: "Friday",
        label: "1:00 PM",
        startsAt: "2026-11-14T13:00:00+01:00",
      },
    ],
  },
  {
    id: "blood-pressure-check",
    name: "Blood pressure check",
    category: "Wellness",
    description:
      "A quick blood pressure assessment with practical follow-up guidance.",
    longDescription:
      "A short clinic visit for a blood pressure measurement and explanation of the reading. This is not emergency care or a diagnosis.",
    durationMinutes: 15,
    priceMinor: 250000,
    currency: "NGN",
    featured: false,
    clinic: {
      id: "harbour-family-clinic",
      name: "Harbour Family Clinic",
      location: "Lekki, Lagos",
      address: "18 Admiralty Way, Lekki Phase 1, Lagos",
      timezone: "Africa/Lagos",
    },
    availability: [
      {
        id: "bp-1",
        dateLabel: "Tomorrow",
        label: "11:00 AM",
        startsAt: "2026-11-13T11:00:00+01:00",
      },
    ],
  },
];
export function formatPrice(priceMinor: number, currency: Service["currency"]) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(priceMinor / 100);
}
export function getFeaturedServices() {
  return services.filter((service) => service.featured).slice(0, 3);
}
export function getService(id: string) {
  return services.find((service) => service.id === id);
}
