import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

const DNSSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  
  // Fonction pour sauvegarder dans le fichier texte
  const saveToFile = async (searchData) => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const entry = `${timestamp}|${searchData.domain}|${searchData.ip}|${searchData.type}|${searchData.response}|${searchData.queryTime}\n`;
    
    try {
      await window.fs.appendFile('dig_requests.txt', entry);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    }
  };

  // Fonction de recherche DNS
  const handleSearch = async (e) => {
    e.preventDefault();
    const startTime = performance.now();
    
    try {
      // Simulation recherche DNS (à remplacer par une vraie requête)
      const dnsResult = {
        domain: query,
        ip: '192.168.1.1',
        type: 'A',
        response: 'DNS Response Data',
        queryTime: ((performance.now() - startTime) / 1000).toFixed(3)
      };
      
      await saveToFile(dnsResult);
      setResults(JSON.stringify(dnsResult, null, 2));
    } catch (error) {
      console.error('Erreur recherche:', error);
      setResults('Erreur: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">DNS Search</h1>
        
        <form onSubmit={handleSearch} className="flex flex-col items-center gap-4">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Entrez un domaine..."
              className="w-full p-4 rounded-full border focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
            >
              <SearchIcon size={24} />
            </button>
          </div>
        </form>

        {results && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <pre className="whitespace-pre-wrap">{results}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DNSSearch;