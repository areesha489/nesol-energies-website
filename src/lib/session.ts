const COOKIE_NAME = "nesol_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SECRET || "nesol-dev-secret-change-in-production";
}

function getUsername() {
  return process.env.ADMIN_USERNAME || "nesolenergies";
}

function getPassword() {
  return process.env.ADMIN_PASSWORD || "nesolenergies123!@#";
}

async function signPayload(payload: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export function verifyPassword(password: string) {
  return safeEqual(password, getPassword());
}

export function verifyUsername(username: string) {
  return safeEqual(username.trim(), getUsername());
}

export function verifyCredentials(username: string, password: string) {
  return verifyUsername(username) && verifyPassword(password);
}

export async function createSessionToken() {
  const payload = `admin:${Date.now()}`;
  const signature = await signPayload(payload);
  return `${payload}.${signature}`;
}

export async function validateSessionToken(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = await signPayload(payload);
  if (!safeEqual(signature, expected)) return false;
  const timestamp = Number(payload.split(":")[1]);
  if (Number.isNaN(timestamp)) return false;
  return Date.now() - timestamp < SESSION_MAX_AGE * 1000;
}

export { COOKIE_NAME, SESSION_MAX_AGE };
