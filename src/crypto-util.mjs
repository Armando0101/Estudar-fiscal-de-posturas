function bytesToHex(buf) {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function randomId(bytes) {
  const n = bytes || 16;
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  return bytesToHex(arr);
}

export async function sha256Hex(text) {
  const data = new TextEncoder().encode(String(text));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(hash);
}

export function nowIso() {
  return new Date().toISOString();
}
