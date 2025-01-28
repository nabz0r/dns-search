import { API_URL, ROUTES, REQUEST_TIMEOUT } from '../constants';

export async function searchDomain(domain) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_URL}${ROUTES.SEARCH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la recherche DNS');
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function getRecentSearches() {
  const response = await fetch(`${API_URL}${ROUTES.RECENT}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'historique');
  }

  return response.json();
}