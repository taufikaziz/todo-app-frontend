import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ categories, addTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'low',
    dueDate: '',
    createdBy: 'user1',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title) {
      toast.error('Judul tugas diperlukan.');
      return;
    }
    addTask(newTask);
    setNewTask({ title: '', priority: 'low', dueDate: '', createdBy: 'user1', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Tambah tugas..."
          className="col-span-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="low">Rendah</option>
          <option value="medium">Sedang</option>
          <option value="high">Tinggi</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex justify-end">
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Tugas
        </button>
      </div>
    </form>
  );
};

const TaskItem = ({ task, toggleStatus, deleteTask }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-purple-100 text-purple-800'
  };

  return (
    <li className={`bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 ${
      task.priority === 'high' ? 'border-red-500' : 
      task.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={() => toggleStatus(task)}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
            />
            <h3 className={`text-lg font-medium ${
              task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
              {task.priority === 'high' ? 'Tinggi' : task.priority === 'medium' ? 'Sedang' : 'Rendah'}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
              {task.status === 'completed' ? 'Selesai' : task.status === 'in_progress' ? 'Dalam Proses' : 'Pending'}
            </span>
            {task.dueDate && (
              <span className="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            {task.category && (
              <span className="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                {task.category.name}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
            title="Hapus"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

const TaskList = ({ tasks, toggleStatus, deleteTask }) => (
  <ul className="space-y-3">
    {tasks.map((task) => (
      <TaskItem 
        key={task._id} 
        task={task} 
        toggleStatus={toggleStatus} 
        deleteTask={deleteTask} 
      />
    ))}
  </ul>
);

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, [filter]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/tasks', {
        params: { userId: 'user1', status: filter === 'all' ? undefined : filter }
      });
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error('Gagal memuat tugas.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      toast.error('Gagal memuat kategori.');
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', {
        ...taskData,
        status: 'pending',
        category: taskData.category || undefined
      });
      toast.success('Tugas berhasil ditambahkan!');
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err.message);
      if (err.response) console.error('Response error:', err.response.data);
      toast.error('Gagal menambahkan tugas.');
    }
  };

  const toggleStatus = async (task) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${task._id}`, {
        ...task,
        status: task.status === 'completed' ? 'pending' : 'completed'
      });
      fetchTasks();
      toast.success('Status tugas diperbarui!');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Gagal memperbarui tugas.');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      fetchTasks();
      toast.success('Tugas berhasil dihapus!');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Gagal menghapus tugas.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo List App</h1>
          <p className="text-gray-600">Kelola tugas harian Anda dengan mudah</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
          <TaskForm categories={categories} addTask={addTask} />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div className="flex items-center">
              <label className="mr-2 text-gray-700">Filter by Status:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua</option>
                <option value="pending">Pending</option>
                <option value="in_progress">Dalam Proses</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
            
            <button
              onClick={fetchTasks}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Refresh
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Tidak ada tugas ditemukan
            </div>
          ) : (
            <TaskList tasks={tasks} toggleStatus={toggleStatus} deleteTask={deleteTask} />
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;