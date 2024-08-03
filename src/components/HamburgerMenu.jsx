import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, Bars3Icon, CheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const HamburgerMenu = ({ isOpen, toggleMenu, setFilter, currentFilter }) => {
  const menuVariants = {
    open: { x: 0, transition: { type: 'tween', duration: 0.3 } },
    closed: { x: '-100%', transition: { type: 'tween', duration: 0.3 } },
  };

  const filters = [
    { id: 'all', name: 'Toutes les tâches', icon: Bars3Icon },
    { id: 'todo', name: 'À faire', icon: ExclamationTriangleIcon },
    { id: 'in-progress', name: 'En cours', icon: ClockIcon },
    { id: 'done', name: 'Terminées', icon: CheckIcon },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-emerald-500 rounded-md hover:bg-emerald-600 transition-colors"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-white" />
        )}
      </button>
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 overflow-y-auto"
      >
        <div className="pt-16">
          <nav className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Filtres</h2>
            <ul className="space-y-2">
              {filters.map((filter) => (
                <li key={filter.id}>
                  <button
                    onClick={() => {
                      setFilter(filter.id);
                      toggleMenu();
                    }}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center space-x-3
                      ${currentFilter === filter.id 
                        ? 'bg-emerald-500 text-white' 
                        : 'text-gray-700 hover:bg-emerald-100'}`}
                  >
                    <filter.icon className="w-5 h-5" />
                    <span>{filter.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Ajout du texte en bas */}
        <div className="absolute bottom-8 left-0 right-0 text-center text-gray-400">
          <p>Powered by Prince Kouamé</p>
        </div>
      </motion.div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default HamburgerMenu;