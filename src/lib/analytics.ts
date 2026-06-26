/** GA4 Measurement ID — public, safe in client bundle. */
export const GA_MEASUREMENT_ID = "G-XNQHYSSK8W";

export function getGaMeasurementId() {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (fromEnv?.startsWith("G-")) return fromEnv;
  return GA_MEASUREMENT_ID;
}
