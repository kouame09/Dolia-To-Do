import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors"
    >
      <PlusIcon className="h-8 w-8 text-white" />
    </button>
  );
}

export default AddButton;