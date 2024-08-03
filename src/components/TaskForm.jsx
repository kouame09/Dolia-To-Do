import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

function TaskForm({ onSubmit, onClose, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [subTasks, setSubTasks] = useState([]);
  const [newSubTask, setNewSubTask] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDate(initialData.date || '');
      setSubTasks(initialData.subTasks || []);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, date, subTasks });
    setTitle('');
    setDescription('');
    setDate('');
    setSubTasks([]);
  };

  const addSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([...subTasks, { id: Date.now(), text: newSubTask, completed: false }]);
      setNewSubTask('');
    }
  };

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
        onClick={handleOutsideClick}
      >
        <motion.div
          ref={formRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg w-full max-w-md overflow-y-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
            <h2 className="text-xl font-semibold">{initialData ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sous-tâches
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={newSubTask}
                  onChange={(e) => setNewSubTask(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ajouter une sous-tâche"
                />
                <button
                  type="button"
                  onClick={addSubTask}
                  className="bg-emerald-500 text-white px-3 py-2 rounded-r-md hover:bg-emerald-600 transition-colors"
                >
                  <PlusCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <ul className="space-y-2">
                {subTasks.map((subTask) => (
                  <li key={subTask.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={subTask.completed}
                      onChange={() => {
                        setSubTasks(subTasks.map(st => 
                          st.id === subTask.id ? { ...st, completed: !st.completed } : st
                        ));
                      }}
                      className="mr-2"
                    />
                    <span className={subTask.completed ? 'line-through text-gray-500' : ''}>
                      {subTask.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
            >
              {initialData ? 'Modifier la tâche' : 'Ajouter la tâche'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TaskForm;