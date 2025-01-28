import React, { useState, useEffect } from 'react';
import { SearchIcon, HistoryIcon } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const DNSSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupération de l'historique des recherches
  const fetchRecentSearches = async () => {
    try {
      const response = await fetch(`${API_URL}/api/recent`);
      const data = await response.json();
      setRecentSearches(data);
    } catch (error) {
      console.error('Erreur récupération historique:', error);
    }
  };

  // Chargement initial de l'historique
  useEffect(() => {
    fetchRecentSearches();
  }, []);

  // Recherche DNS
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: query })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche DNS');
      }

      const data = await response.json();
      setResults(data);
      fetchRecentSearches(); // Mise à jour de l'historique
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">DNS Search</h1>
        
        <form onSubmit={handleSearch} className="flex flex-col items-center gap-4">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Entrez un domaine..."
              className="w-full p-4 rounded-full border focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              disabled={loading}
            >
              <SearchIcon size={24} />
            </button>
          </div>
        </form>

        {/* Affichage des erreurs */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Affichage des résultats */}
        {results && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Résultats</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}

        {/* Historique des recherches */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <HistoryIcon size={20} />
            Recherches récentes
          </h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Domaine</th>
                  <th className="px-4 py-2 text-left">IP</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Temps</th>
                </tr>
              </thead>
              <tbody>
                {recentSearches.map((search) => (
                  <tr key={search._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{search.domain}</td>
                    <td className="px-4 py-2">{search.ip}</td>
                    <td className="px-4 py-2">{search.type}</td>
                    <td className="px-4 py-2">{search.queryTime.toFixed(3)}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNSSearch;