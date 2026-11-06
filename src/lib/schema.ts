import { CLINIC } from "@/data/site";
import { SITE_URL } from "./i18n";

export const clinicSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  name: CLINIC.name,
  legalName: CLINIC.legal,
  url: SITE_URL,
  telephone: "+37362000020",
  email: CLINIC.email,
  address: { "@type": "PostalAddress", addressLocality: "Bălți", addressCountry: "MD" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
  ],
  sameAs: CLINIC.socials.map((s) => s.href),
};
