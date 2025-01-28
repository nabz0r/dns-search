import React from 'react';

export const ResultCard = ({ title, children }) => (
  <div className="mt-8 p-4 bg-white rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);