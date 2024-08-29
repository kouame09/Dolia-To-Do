import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={`fixed right-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors ${
        window.innerWidth < 768 ? 'bottom-20' : 'bottom-6'
      }`}
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <PlusIcon className="h-8 w-8 text-white" />
      </div>
    </button>
  );
}

export default AddButton;