// Utilitas untuk mengelola Local Storage
export const loadTasksFromStorage = () => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      console.log("Loaded tasks from Local Storage:", storedTasks);
      return storedTasks || [];
    } catch (error) {
      console.error("Error loading tasks from Local Storage:", error);
      return [];
    }
  };
  
  export const saveTasksToStorage = (tasksToSave) => {
    try {
      console.log("Saving tasks to Local Storage:", tasksToSave);
      localStorage.setItem("tasks", JSON.stringify(tasksToSave));
    } catch (error) {
      console.error("Error saving tasks to Local Storage:", error);
    }
  };