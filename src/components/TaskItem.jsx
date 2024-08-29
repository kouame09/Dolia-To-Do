import React from 'react';
import { PencilIcon, TrashIcon, CalendarIcon } from '@heroicons/react/24/solid';

function TaskItem({ task, onEdit, onDelete, onSubTaskChange }) {
  const statusColors = {
    todo: 'bg-red-100 text-red-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    done: 'bg-green-100 text-green-800'
  };

  const calculateProgress = () => {
    if (!task.subTasks || task.subTasks.length === 0) return 0;
    const completedTasks = task.subTasks.filter(st => st.completed).length;
    return Math.round((completedTasks / task.subTasks.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[task.status]}`}>
              {task.status === 'todo' ? 'À faire' : 
               task.status === 'in-progress' ? 'En cours' : 'Terminé'}
            </span>
            <button
              onClick={() => onEdit(task)}
              className="text-emerald-500 hover:text-emerald-600 transition-colors p-1 rounded-full hover:bg-emerald-100"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-100"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        {task.description && (
          <p className="text-gray-600 mb-3">{task.description}</p>
        )}
        {task.date && (
          <div className="flex items-center text-gray-500 mb-3">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{new Date(task.date).toLocaleDateString()}</span>
          </div>
        )}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div 
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-right">{progress}% complété</p>
        </div>
        {task.subTasks && task.subTasks.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium text-gray-700 mb-2">Sous-tâches:</h4>
            <ul className="space-y-2">
              {task.subTasks.map((subTask) => (
                <li key={subTask.id} className="flex items-center bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={subTask.completed}
                    onChange={() => onSubTaskChange(task.id, subTask.id)}
                    className="mr-2"
                  />
                  <span className={subTask.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                    {subTask.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;