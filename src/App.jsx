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
import FolderOptionsModal from './components/FolderOptionsModal';

function App() {
  const [folders, setFolders] = useLocalStorage('folders', []);
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingFolder, setEditingFolder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isFolderOptionsOpen, setIsFolderOptionsOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log("Tâches:", tasks);
    console.log("Dossiers:", folders);
  }, [tasks, folders]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      status: 'todo',
      folderId: task.folderId || (selectedFolder ? selectedFolder.id : null)
    };
    console.log("Nouvelle tâche ajoutée:", newTask);
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, ...updatedTask, folderId: updatedTask.folderId || task.folderId } 
        : task
    );
    console.log("Tâche mise à jour:", updatedTasks.find(t => t.id === id));
    setTasks(updatedTasks);
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
    if (selectedFolder && selectedFolder.id === id) {
      setSelectedFolder(null);
    }
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
    console.log('Filtrage - Task:', task.title, 'FolderId:', task.folderId, 'Selected Folder:', selectedFolder?.id);
    if (selectedFolder) {
      const isInFolder = task.folderId === selectedFolder.id;
      console.log(`La tâche "${task.title}" est${isInFolder ? '' : ' non'} dans le dossier sélectionné`);
      return isInFolder;
    }
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const openFolderOptions = (folder) => {
    setSelectedFolder(folder);
    setIsFolderOptionsOpen(true);
  };

  const handleFolderSelect = (folder) => {
    const newSelectedFolder = folder.id === selectedFolder?.id ? null : folder;
    console.log("Dossier sélectionné:", newSelectedFolder);
    setSelectedFolder(newSelectedFolder);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HamburgerMenu
        isOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        setFilter={setFilter}
        currentFilter={filter}
      />
      <div className={`p-4 transition-all duration-300 ${isMenuOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold text-center py-6 bg-white text-emerald-500 rounded-lg">Dolia</h1>
        
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
                onSelectFolder={handleFolderSelect}
                isSelected={selectedFolder?.id === folder.id}
                onOpenOptions={() => openFolderOptions(folder)}
              />
            ))}
          </div>
        </div>
        
        {selectedFolder && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Tâches dans {selectedFolder.name}</h3>
            <button
              onClick={() => setSelectedFolder(null)}
              className="mt-2 text-sm text-emerald-600 hover:text-emerald-800"
            >
              Voir toutes les tâches
            </button>
          </div>
        )}
        
        <TaskList 
          tasks={filteredTasks}
          folders={folders}
          onEditTask={setEditingTask}
          onDeleteTask={deleteTask}
          onSubTaskChange={handleSubTaskChange}
          selectedFolder={selectedFolder}
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
