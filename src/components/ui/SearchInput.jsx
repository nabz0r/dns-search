import React from 'react';
import { SearchIcon } from 'lucide-react';

export const SearchInput = ({ value, onChange, onSubmit, loading }) => (
  <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Entrez un domaine..."
        className="w-full p-4 rounded-full border focus:outline-none focus:border-blue-500"
        disabled={loading}
      />
      <button 
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 disabled:opacity-50"
        disabled={loading}
      >
        <SearchIcon size={24} />
      </button>
    </div>
  </form>
);