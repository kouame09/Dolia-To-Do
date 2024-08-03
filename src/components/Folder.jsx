import React, { useState } from 'react';
import { FolderIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import FolderOptionsModal from './FolderOptionsModal';

function Folder({ folder, onEditFolder, onDeleteFolder }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex-shrink-0 w-24">
      <div className="flex flex-col items-center">
        <FolderIcon className="h-10 w-10 text-emerald-500 mb-1" />
        <span className="text-xs font-medium text-gray-700 text-center truncate w-full">{folder.name}</span>
      </div>
      <button
        onClick={toggleMenu}
        className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
      >
        <EllipsisVerticalIcon className="h-4 w-4 text-gray-500" />
      </button>
      <FolderOptionsModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        folder={folder}
        onEditFolder={onEditFolder}
        onDeleteFolder={onDeleteFolder}
      />
    </div>
  );
}

export default Folder;