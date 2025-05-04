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
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Tambah tugas..."
            className="flex-1 p-2 border rounded"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Tambah
          </button>
        </div>
      </form>
    );
  };

  const TaskList = ({ tasks, toggleStatus, deleteTask }) => (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <span
              className={task.status === 'completed' ? 'line-through text-gray-500' : ''}
            >
              {task.title} ({task.priority}) -{' '}
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
              {task.category && ` - ${task.category.name}`}
            </span>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => toggleStatus(task)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              {task.status === 'completed' ? 'Batal' : 'Selesai'}
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  const App = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
      fetchTasks();
      fetchCategories();
    }, []);

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks', {
          params: { userId: 'user1', status: filter === 'all' ? undefined : filter }
        });
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        toast.error('Gagal memuat tugas.');
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
        console.log('Adding task with data:', taskData);
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
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Todo List</h1>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <TaskForm categories={categories} addTask={addTask} />
          <div className="mb-4">
            <label className="mr-2">Filter by Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={fetchTasks}
              className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
          <TaskList tasks={tasks} toggleStatus={toggleStatus} deleteTask={deleteTask} />
        </div>
        <ToastContainer />
      </div>
    );
  };

  export default App;