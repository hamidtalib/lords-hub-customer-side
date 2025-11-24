let inMemoryVisitorId: string | null = null;

function generateId() {
  return "visitor-" + crypto.randomUUID();
}

export function getVisitorId(): string {
  if (typeof window === "undefined") return generateId();

  if (inMemoryVisitorId) return inMemoryVisitorId;

  const stored = localStorage.getItem("visitor_id");

  if (stored) {
    inMemoryVisitorId = stored;
    return stored;
  }

  const newId = generateId();
  localStorage.setItem("visitor_id", newId);
  inMemoryVisitorId = newId;
  return newId;
}
