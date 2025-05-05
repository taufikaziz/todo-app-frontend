import React, { useState } from "react";
import { toast } from "react-toastify";
import { PRIORITY_LEVELS } from "../constants/constants";

// Komponen untuk form penambahan task
const TaskForm = ({ categories, onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "low",
    dueDate: "",
    createdBy: "user1",
    categoryId: "",
  });

  const handleInputChange = (field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast.error("Judul tugas diperlukan.");
      return;
    }
    onAddTask(newTask);
    setNewTask({ title: "", priority: "low", dueDate: "", createdBy: "user1", categoryId: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Tambah tugas..."
          className="col-span-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={newTask.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.keys(PRIORITY_LEVELS).map((level) => (
            <option key={level} value={level}>
              {PRIORITY_LEVELS[level]}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={newTask.dueDate}
          onChange={(e) => handleInputChange("dueDate", e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={newTask.categoryId}
          onChange={(e) => handleInputChange("categoryId", e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Tambah Tugas
        </button>
      </div>
    </form>
  );
};

export default TaskForm;