import React from 'react';
import { HistoryIcon } from 'lucide-react';

export const SearchHistory = ({ searches }) => {
  if (!searches || searches.length === 0) return null;

  return (
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
            {searches.map((search) => (
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
  );
};