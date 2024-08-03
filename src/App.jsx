import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddButton from './components/AddButton';
import TaskForm from './components/TaskForm';
import FolderForm from './components/FolderForm';
import Folder from './components/Folder';
import HamburgerMenu from './components/HamburgerMenu';
import Loader from './components/Loader';
import useLocalStorage from './hooks/useLocalStorage';
import { AnimatePresence } from 'framer-motion';
import FolderOptionsModal from './components/FolderOptionsModal'; // Assurez-vous d'importer le nouveau modal

function App() {
  const [folders, setFolders] = useLocalStorage('folders', []);
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingFolder, setEditingFolder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isFolderOptionsOpen, setIsFolderOptionsOpen] = useState(false); // Pour le modal des options de dossier
  const [selectedFolder, setSelectedFolder] = useState(null); // Pour garder la trace du dossier sélectionné

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), ...task, status: 'todo' }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addFolder = (folder) => {
    setFolders([...folders, { id: Date.now(), ...folder }]);
  };

  const updateFolder = (id, updatedFolder) => {
    setFolders(folders.map(folder => folder.id === id ? { ...folder, ...updatedFolder } : folder));
  };

  const deleteFolder = (id) => {
    setFolders(folders.filter(folder => folder.id !== id));
    setTasks(tasks.map(task => task.folderId === id ? { ...task, folderId: null } : task));
  };

  const handleTaskFormSubmit = (task) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setEditingTask(null);
    } else {
      addTask(task);
    }
    setIsTaskFormOpen(false);
  };

  const handleFolderFormSubmit = (folder) => {
    if (editingFolder) {
      updateFolder(editingFolder.id, folder);
      setEditingFolder(null);
    } else {
      addFolder(folder);
    }
    setIsFolderFormOpen(false);
  };

  const handleSubTaskChange = (taskId, subTaskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubTasks = task.subTasks.map(st => 
          st.id === subTaskId ? { ...st, completed: !st.completed } : st
        );
        const completedSubTasks = updatedSubTasks.filter(st => st.completed).length;
        let newStatus;
        if (completedSubTasks === 0) {
          newStatus = 'todo';
        } else if (completedSubTasks === updatedSubTasks.length) {
          newStatus = 'done';
        } else {
          newStatus = 'in-progress';
        }
        return { ...task, subTasks: updatedSubTasks, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const openFolderOptions = (folder) => {
    setSelectedFolder(folder);
    setIsFolderOptionsOpen(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HamburgerMenu
        isOpen={false}
        toggleMenu={() => {}}
        setFilter={setFilter}
        currentFilter={filter}
      />
      <div className={`p-4`}>
        <h1 className="text-3xl font-bold text-center py-6 bg-emerald-500 text-white rounded-lg">Dolia app</h1>
        
        {/* Folder management */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dossiers</h2>
          <button
            onClick={() => setIsFolderFormOpen(true)}
            className="bg-emerald-500 mt-4 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
          >
            Ajouter un dossier
          </button>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {folders.map(folder => (
              <Folder
                key={folder.id}
                folder={folder}
                onEditFolder={() => {
                  setEditingFolder(folder);
                  setIsFolderFormOpen(true);
                }}
                onDeleteFolder={deleteFolder}
                onOpenOptions={() => openFolderOptions(folder)} // Ouvrir les options du dossier
              />
            ))}
          </div>
        </div>
        
        <TaskList 
          tasks={filteredTasks}
          folders={folders}
          onEditTask={setEditingTask}
          onDeleteTask={deleteTask}
          onSubTaskChange={handleSubTaskChange}
        />
      </div>
      
      <AddButton onClick={() => setIsTaskFormOpen(true)} />
      
      <AnimatePresence>
        {(isTaskFormOpen || editingTask) && (
          <TaskForm
            key="task-form"
            onSubmit={handleTaskFormSubmit}
            onClose={() => {
              setIsTaskFormOpen(false);
              setEditingTask(null);
            }}
            initialData={editingTask}
            folders={folders}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {(isFolderFormOpen || editingFolder) && (
          <FolderForm
            key="folder-form"
            onSubmit={handleFolderFormSubmit}
            onClose={() => {
              setIsFolderFormOpen(false);
              setEditingFolder(null);
            }}
            initialData={editingFolder}
          />
        )}
      </AnimatePresence>

      {/* Modal pour les options de dossier */}
      <FolderOptionsModal
        isOpen={isFolderOptionsOpen}
        onClose={() => setIsFolderOptionsOpen(false)}
        folder={selectedFolder}
        onEditFolder={handleFolderFormSubmit}
        onDeleteFolder={deleteFolder}
      />
    </div>
  );
}

export default App;