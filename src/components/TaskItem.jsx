import React from 'react';
import { PencilIcon, TrashIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const statusColors = {
    todo: 'bg-red-100 text-red-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    done: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          <div className="flex items-center space-x-2">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className={`text-sm border rounded p-1 ${statusColors[task.status]}`}
            >
              <option value="todo" className="text-red-800">À faire</option>
              <option value="in-progress" className="text-yellow-800">En cours</option>
              <option value="done" className="text-green-800">Terminé</option>
            </select>
            <button
              onClick={() => onEdit(task)}
              className="text-emerald-500 hover:text-emerald-600 transition-colors p-1 rounded-full hover:bg-blue-100"
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
        {task.subTasks && task.subTasks.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium text-gray-700 mb-2">Sous-tâches:</h4>
            <ul className="space-y-2">
              {task.subTasks.map((subTask) => (
                <li key={subTask.id} className="flex items-center bg-gray-50 p-2 rounded">
                  <CheckCircleIcon 
                    className={`h-5 w-5 mr-2 ${subTask.completed ? 'text-green-500' : 'text-gray-300'}`} 
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