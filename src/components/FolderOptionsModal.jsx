import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

function FolderOptionsModal({ isOpen, onClose, folder, onEditFolder, onDeleteFolder }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-64">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Options du dossier</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => {
              onEditFolder(folder);
              onClose();
            }}
            className="py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
          >
            Modifier
          </button>
          <button
            onClick={() => {
              onDeleteFolder(folder.id);
              onClose();
            }}
            className="py-2 text-left text-red-600 hover:bg-gray-100 w-full"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default FolderOptionsModal;