import React from 'react';

export const ErrorMessage = ({ message }) => (
  <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    {message}
  </div>
);