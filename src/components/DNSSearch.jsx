/**
 * Composant principal de recherche DNS.
 * Permet aux utilisateurs de faire des requêtes DNS et stocke les résultats dans un fichier texte.
 * 
 * Structure du fichier dig_requests.txt:
 * timestamp|domain|ip|dns_type|response|query_time
 */

import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

const DNSSearch = () => {
  // État pour gérer la requête utilisateur
  const [query, setQuery] = useState('');
  // État pour stocker les résultats de la recherche
  const [results, setResults] = useState(null);
  
  /**
   * Sauvegarde les résultats de recherche dans un fichier texte.
   * Format: timestamp|domain|ip|dns_type|response|query_time
   * 
   * @param {Object} searchData - Données de la recherche
   * @param {string} searchData.domain - Domaine recherché
   * @param {string} searchData.ip - Adresse IP trouvée
   * @param {string} searchData.type - Type de requête DNS (A, AAAA, MX, etc.)
   * @param {string} searchData.response - Réponse DNS complète
   * @param {number} searchData.queryTime - Temps de réponse en secondes
   */
  const saveToFile = async (searchData) => {
    // Format de timestamp: YYYY-MM-DD HH:mm:ss
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const entry = `${timestamp}|${searchData.domain}|${searchData.ip}|${searchData.type}|${searchData.response}|${searchData.queryTime}\n`;
    
    try {
      await window.fs.appendFile('dig_requests.txt', entry);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  /**
   * Gère la soumission du formulaire de recherche.
   * Effectue une requête DNS et sauvegarde les résultats.
   * 
   * @param {Event} e - Événement de soumission du formulaire
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    const startTime = performance.now();
    
    try {
      // TODO: Implémenter la vraie requête DNS
      // Pour l'instant, on simule une réponse
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
      console.error('Erreur lors de la recherche:', error);
      setResults('Erreur: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">DNS Search</h1>
        
        {/* Formulaire de recherche */}
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
              aria-label="Rechercher"
            >
              <SearchIcon size={24} />
            </button>
          </div>
        </form>

        {/* Affichage des résultats */}
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