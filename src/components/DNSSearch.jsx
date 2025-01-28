import React, { useState, useEffect } from 'react';
import { SearchInput } from './ui/SearchInput';
import { ResultCard } from './ui/ResultCard';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorMessage } from './ui/ErrorMessage';
import { SearchHistory } from './SearchHistory';
import { searchDomain, getRecentSearches } from '../services/api';
import { ERROR_MESSAGES } from '../constants';

const DNSSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  const fetchRecentSearches = async () => {
    try {
      const data = await getRecentSearches();
      setRecentSearches(data);
    } catch (error) {
      console.error('Erreur récupération historique:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchDomain(query);
      setResults(data);
      fetchRecentSearches();
    } catch (error) {
      if (error.name === 'AbortError') {
        setError(ERROR_MESSAGES.TIMEOUT);
      } else {
        setError(error.message || ERROR_MESSAGES.DEFAULT);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">DNS Search</h1>
        
        <SearchInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          loading={loading}
        />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {results && (
          <ResultCard title="Résultats">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(results, null, 2)}
            </pre>
          </ResultCard>
        )}

        <SearchHistory searches={recentSearches} />
      </div>
    </div>
  );
};

export default DNSSearch;