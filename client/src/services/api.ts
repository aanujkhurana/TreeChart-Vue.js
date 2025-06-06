// src/services/api.ts
const BASE_URL = import.env.production.API_URL;

export async function fetchData(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }

  return await res.json();
}

// Example usage:
// const data = await fetchData('/api/nodes');
