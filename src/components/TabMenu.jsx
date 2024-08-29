import React from 'react';
import { HomeIcon, ExclamationTriangleIcon, ClockIcon, CheckIcon } from '@heroicons/react/24/outline';

const TabMenu = ({ onTabSelect, selectedTab }) => {
  const tabs = [
    { id: 'all', name: 'Accueil', icon: HomeIcon },
    { id: 'todo', name: 'À faire', icon: ExclamationTriangleIcon },
    { id: 'in-progress', name: 'En cours', icon: ClockIcon },
    { id: 'done', name: 'Terminé', icon: CheckIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around p-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabSelect(tab.id)}
          className={`flex flex-col items-center ${selectedTab === tab.id ? 'text-emerald-500' : 'text-gray-500'}`}
        >
          <tab.icon className="h-6 w-6" />
          <span className="text-xs">{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TabMenu;