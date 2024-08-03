import React from 'react';
import { XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

function FolderOptionsModal({ isOpen, onClose, folder, onEditFolder, onDeleteFolder }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Options du dossier</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => {
              onEditFolder(folder);
              onClose();
            }}
            className="py-2 px-4 text-left text-gray-700 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-between"
          >
            <span>Modifier</span>
            <PencilIcon className="h-5 w-5 text-emerald-500" />
          </button>
          <button
            onClick={() => {
              onDeleteFolder(folder.id);
              onClose();
            }}
            className="py-2 px-4 text-left text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-between"
          >
            <span>Supprimer</span>
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FolderOptionsModal;