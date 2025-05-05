import { toast } from "react-toastify";
import { saveTasksToStorage, loadTasksFromStorage } from "./storage";

// Aksi untuk menambah task
export const handleAddTask = (taskData, tasks, setTasks) => {
  const newTask = {
    id: Date.now(),
    ...taskData,
    status: "pending",
    categoryId: taskData.categoryId || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updatedTasks = [...tasks, newTask];
  setTasks(updatedTasks);
  saveTasksToStorage(updatedTasks);
  toast.success("Tugas berhasil ditambahkan!");
};

// Aksi untuk mengubah status task
export const handleToggleStatus = (task, tasks, setTasks) => {
  const updatedTasks = tasks.map((t) =>
    t.id === task.id
      ? {
          ...t,
          status: t.status === "completed" ? "pending" : "completed",
          updatedAt: new Date().toISOString(),
        }
      : t
  );
  setTasks(updatedTasks);
  saveTasksToStorage(updatedTasks);
  toast.success("Status tugas diperbarui!");
};

// Aksi untuk menghapus task
export const handleDeleteTask = (taskId, tasks, setTasks) => {
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  setTasks(updatedTasks);
  saveTasksToStorage(updatedTasks);
  toast.success("Tugas berhasil dihapus!");
};

// Aksi untuk refresh data
export const handleRefresh = (setTasks, setFilter) => {
  const storedTasks = loadTasksFromStorage();
  if (storedTasks && storedTasks.length > 0) {
    setTasks(storedTasks);
    setFilter("all"); // Atur ulang filter ke "all"
    toast.success("Data tugas disegarkan!");
  } else {
    setTasks([]);
    setFilter("all"); // Atur ulang filter ke "all" meskipun tidak ada data
    toast.info("Tidak ada data tugas untuk disegarkan.");
  }
};