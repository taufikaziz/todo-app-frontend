import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { DEFAULT_CATEGORIES } from "./constants/constants";
import { loadTasksFromStorage, saveTasksToStorage } from "./utils/storage";
import { handleAddTask, handleToggleStatus, handleDeleteTask, handleRefresh } from "./utils/taskActions";
import "./App.css";

// Komponen utama aplikasi
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [filter, setFilter] = useState("all");

  // Inisialisasi data saat komponen dimuat
  useEffect(() => {
    const storedTasks = loadTasksFromStorage();
    setTasks(storedTasks);
  }, []);

  // Simpan tasks ke Local Storage setiap kali berubah
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToStorage(tasks);
    }
  }, [tasks]);

  // Filter tasks berdasarkan status
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo List</h1>
          <p className="text-gray-600">JUST DO IT</p>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
          <TaskForm
            categories={categories}
            onAddTask={(taskData) => handleAddTask(taskData, tasks, setTasks)}
          />
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
              onClick={() => handleRefresh(setTasks, setFilter)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Refresh
            </button>
          </div>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Tidak ada tugas ditemukan
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              categories={categories}
              onToggleStatus={(task) => handleToggleStatus(task, tasks, setTasks)}
              onDeleteTask={(taskId) => handleDeleteTask(taskId, tasks, setTasks)}
            />
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;