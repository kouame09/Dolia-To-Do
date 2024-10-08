import React from 'react';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';

function TaskList({ tasks, folders, onEditTask, onDeleteTask, onSubTaskChange, selectedFolder }) {
  const message = selectedFolder
    ? `Il n'y a pas encore de tâches dans le dossier "${selectedFolder.name}". Ajoutez une nouvelle tâche !`
    : "Il n'y a pas encore de tâches. Ajoutez une nouvelle tâche !";

  console.log("TaskList - Tâches reçues:", tasks);
  console.log("TaskList - Dossier sélectionné:", selectedFolder);

  return (
    <div className="p-4">
      {tasks.length === 0 ? (
        <p className="text-center py-8 text-gray-500">{message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TaskItem 
                  task={task} 
                  onEdit={onEditTask} 
                  onDelete={onDeleteTask} 
                  onSubTaskChange={onSubTaskChange}
                  folders={folders}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default TaskList;
