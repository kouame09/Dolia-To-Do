import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddButton from './components/AddButton';
import TaskForm from './components/TaskForm';
import HamburgerMenu from './components/HamburgerMenu';
import Loader from './components/Loader';
import useLocalStorage from './hooks/useLocalStorage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Affiche le loader pendant 2 secondes
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

  const handleFormSubmit = (task) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setEditingTask(null);
    } else {
      addTask(task);
    }
    setIsFormOpen(false);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
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
        <h1 className="text-3xl font-bold text-center py-6 bg-emerald-500 text-white rounded-lg">Dolia app</h1>
        <TaskList 
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          onSubTaskChange={handleSubTaskChange} // Pass the handleSubTaskChange function
        />
      </div>
      
      <AddButton onClick={() => setIsFormOpen(true)} />
      
      <AnimatePresence>
        {(isFormOpen || editingTask) && (
          <TaskForm
            key="task-form"
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            initialData={editingTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;