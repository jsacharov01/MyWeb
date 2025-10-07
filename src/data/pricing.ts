export interface PricingItem {
  title: string;
  price: string;
  description?: string;
  note?: string;
}

// Orientační ceny – lze upravit po úvodní konzultaci.
export const pricing: PricingItem[] = [
  {
    title: "Řízení (Agilní / PRINCE2)",
    price: "300 000 Kč",
    description:
      "Projekt ~6 měsíců, tým do 6 lidí. End‑to‑end koordinace, governance, reporting, řízení rizik a stakeholder management.",
  },
  {
    title: "Byznys Analýza",
    price: "250 000 Kč",
    description:
      "Analýza požadavků, procesní modely, datové toky, definice scope, podporované testování a akceptace.",
  },
  {
    title: "Nezávislá konzultace",
    price: "2 000 Kč / Hodinu",
    description:
      "Ad‑hoc konzultace – audit stavu, second opinion, facilitace workshopu nebo mentoring.",
  },
];
