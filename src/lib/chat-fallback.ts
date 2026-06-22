import type { SiteContent } from "./content-types";
import { getPriceRange, formatPrice } from "./pricing-utils";

const PAKISTAN_CITIES: Record<string, { lat: number; lon: number; name: string }> = {
  karachi: { lat: 24.8607, lon: 67.0011, name: "Karachi" },
  lahore: { lat: 31.5204, lon: 74.3587, name: "Lahore" },
  islamabad: { lat: 33.6844, lon: 73.0479, name: "Islamabad" },
  rawalpindi: { lat: 33.5651, lon: 73.0169, name: "Rawalpindi" },
  faisalabad: { lat: 31.4504, lon: 73.135, name: "Faisalabad" },
  multan: { lat: 30.1575, lon: 71.5249, name: "Multan" },
  peshawar: { lat: 34.0151, lon: 71.5788, name: "Peshawar" },
  quetta: { lat: 30.1798, lon: 66.975, name: "Quetta" },
  hyderabad: { lat: 25.396, lon: 68.3578, name: "Hyderabad" },
};

const WEATHER_CODES: Record<number, string> = {
  0: "Clear sky ☀️",
  1: "Mainly clear 🌤️",
  2: "Partly cloudy ⛅",
  3: "Overcast ☁️",
  45: "Foggy 🌫️",
  48: "Foggy 🌫️",
  51: "Light drizzle 🌦️",
  53: "Drizzle 🌦️",
  55: "Heavy drizzle 🌧️",
  61: "Light rain 🌧️",
  63: "Rain 🌧️",
  65: "Heavy rain 🌧️",
  71: "Light snow ❄️",
  73: "Snow ❄️",
  75: "Heavy snow ❄️",
  80: "Rain showers 🌦️",
  81: "Rain showers 🌧️",
  82: "Heavy showers ⛈️",
  95: "Thunderstorm ⛈️",
  96: "Thunderstorm with hail ⛈️",
  99: "Thunderstorm with hail ⛈️",
};

function detectCity(text: string) {
  const lower = text.toLowerCase();
  for (const [key, city] of Object.entries(PAKISTAN_CITIES)) {
    if (lower.includes(key)) return city;
  }
  return PAKISTAN_CITIES.karachi;
}

function isWeatherQuery(text: string) {
  const lower = text.toLowerCase();
  return /weather|temperature|temp|mausam|mosam|barish|rain|garmi|sardi|tapman|humidity|forecast|kitna hai|kesa hai|kaisa hai|aj ka|aaj ka|کل|آج/.test(lower);
}

function isNesolQuery(text: string) {
  const lower = text.toLowerCase();
  return /nesol|solar|panel|kw|kilowatt|quote|price|rate|service|office|address|contact|whatsapp|company profile|renewable|energy/.test(lower);
}

function isGreeting(text: string) {
  const lower = text.toLowerCase().trim();
  return /^(hi|hello|salam|assalam|aoa|hey|thanks|shukriya)/.test(lower);
}

function extractKw(text: string): number | null {
  const match = text.match(/(\d+(?:\.\d+)?)\s*kw/i) || text.match(/(\d+(?:\.\d+)?)\s*kilo/i);
  return match ? parseFloat(match[1]) : null;
}

async function getWeatherReply(city: { lat: number; lon: number; name: string }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FKarachi`;

  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("Weather fetch failed");

  const data = await res.json();
  const c = data.current;
  const condition = WEATHER_CODES[c.weather_code] ?? "Unknown";
  const date = new Date().toLocaleDateString("en-PK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Asia/Karachi",
  });

  return `${city.name} — ${date}

🌡️ Temperature: ${Math.round(c.temperature_2m)}°C (feels like ${Math.round(c.apparent_temperature)}°C)
🌤️ Mausam: ${condition}
💧 Humidity: ${c.relative_humidity_2m}%
💨 Wind: ${Math.round(c.wind_speed_10m)} km/h

Source: Open-Meteo live weather data.`;
}

async function getWikipediaReply(query: string): Promise<string | null> {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=1&namespace=0&format=json`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 86400 } });
    const searchData = await searchRes.json();
    const title = searchData?.[1]?.[0];
    if (!title) return null;

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const summaryRes = await fetch(summaryUrl, { next: { revalidate: 86400 } });
    if (!summaryRes.ok) return null;

    const summary = await summaryRes.json();
    const extract = summary.extract as string | undefined;
    if (!extract) return null;

    const short = extract.length > 600 ? extract.slice(0, 600) + "..." : extract;
    return `${short}\n\nSource: Wikipedia (${title})`;
  } catch {
    return null;
  }
}

function getNesolReply(question: string, content: SiteContent): string | null {
  const lower = question.toLowerCase();
  const { contact, pricingCalculator, services, companies } = content;

  if (/phone|call|whatsapp|number|rabta|contact/.test(lower)) {
    return `Nesol Energies se rabta:\n📞 Phone: ${contact.phone}\n📧 Email: ${contact.email}\n📍 ${contact.address.line1}, ${contact.address.line2}, ${contact.address.line3}\n\nWhatsApp par quote ke liye contact karein!`;
  }

  if (/address|office|location|kahan|where/.test(lower)) {
    return `Nesol Energies Head Office:\n📍 ${contact.address.label}\n${contact.address.line1}\n${contact.address.line2}\n${contact.address.line3}`;
  }

  const kw = extractKw(question);
  if (kw || /price|rate|cost|kitne ka|budget|calculator/.test(lower)) {
    const size = kw ?? 5;
    const range = getPriceRange(size, pricingCalculator.tiers);
    if (range) {
      return `${size} kW solar system estimate:\n\n💚 Min: ${formatPrice(range.min, pricingCalculator.currency)}\n🧡 Max: ${formatPrice(range.max, pricingCalculator.currency)}\n\nExact quote ke liye /calculator page dekhein ya call karein: ${contact.phone}`;
    }
  }

  if (/service|offer|provide|deti|kya karti/.test(lower)) {
    const list = services.items.map((s) => `• ${s.title}`).join("\n");
    return `Nesol Energies services:\n\n${list}\n\nDetails: /services`;
  }

  if (/compan|brand|group/.test(lower)) {
    const list = companies.items.map((c) => `• ${c.name} — ${c.tagline}`).join("\n");
    return `Nesol Group of Companies:\n\n${list}`;
  }

  if (/nesol|solar|energy/.test(lower)) {
    return `Nesol Energies Group of Companies Pakistan mein solar aur renewable energy solutions deti hai.\n\n📞 ${contact.phone}\n🌐 Price calculator: /calculator\n📋 Contact: /contact`;
  }

  return null;
}

export async function getFallbackReply(question: string, content: SiteContent): Promise<string> {
  const trimmed = question.trim();
  if (!trimmed) return "Baraye meherbani apna sawal likhein.";

  if (isGreeting(trimmed)) {
    return `Wa Alaikum Assalam! Main Nesol assistant hoon. Weather, solar prices, ya koi bhi sawal pooch sakte hain.\n\nDirect rabta: ${content.contact.phone}`;
  }

  if (isWeatherQuery(trimmed)) {
    try {
      const city = detectCity(trimmed);
      return await getWeatherReply(city);
    } catch {
      return "Weather data abhi fetch nahi ho saka. Thori der baad try karein.";
    }
  }

  const nesolReply = getNesolReply(trimmed, content);
  if (nesolReply) return nesolReply;

  const wikiReply = await getWikipediaReply(trimmed);
  if (wikiReply) return wikiReply;

  return `Main is sawal ka mukammal jawab abhi tayyar nahi kar saka.\n\nNesol Energies se madad:\n📞 ${content.contact.phone}\n📧 ${content.contact.email}\n\nSolar / quote ke liye /contact page par jayein.`;
}

export async function getGeminiReply(
  apiKey: string,
  messages: { role: "user" | "assistant"; content: string }[],
  systemPrompt: string
): Promise<string> {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    systemInstruction: systemPrompt,
  });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(messages[messages.length - 1].content.trim());
  return result.response.text();
}
