import React from "react";
import { PRIORITY_LEVELS, STATUS_TYPES, PRIORITY_COLORS, STATUS_COLORS, BORDER_COLORS } from "../constants/constants";

// Komponen untuk menampilkan satu item task
const TaskItem = ({ task, category, onToggleStatus, onDeleteTask }) => (
  <li
    className={`bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 ${BORDER_COLORS[task.priority]}`}
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={() => onToggleStatus(task)}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
          />
          <h3
            className={`text-lg font-medium ${
              task.status === "completed" ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className={`px-2 py-1 text-xs rounded-full ${PRIORITY_COLORS[task.priority]}`}>
            {PRIORITY_LEVELS[task.priority]}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${STATUS_COLORS[task.status]}`}>
            {STATUS_TYPES[task.status]}
          </span>
          {task.dueDate && (
            <span className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(task.dueDate).toLocaleString()}
            </span>
          )}
          {task.createdAt && (
            <span className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Dibuat: {new Date(task.createdAt).toLocaleString()}
            </span>
          )}
          {task.updatedAt && (
            <span className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Diperbarui: {new Date(task.updatedAt).toLocaleString()}
            </span>
          )}
          {category && (
            <span className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              {category.name}
            </span>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onDeleteTask(task.id)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Hapus"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </li>
);

export default TaskItem;