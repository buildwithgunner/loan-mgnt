import React from 'react';

export default function Maintenance() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[#c5a059] via-[#d4b574] to-[#b08d4a]">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">🚧 Under Maintenance</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We are performing essential updates. Please try again later.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
}
