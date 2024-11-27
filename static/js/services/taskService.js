import { PROJECT_URLS } from "../components/utilities.js";

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await fetch(PROJECT_URLS.UPDATE_TASK(taskId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Error updating task");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getTaskById(projectId, taskId) {
  try {      
      const response = await fetch(PROJECT_URLS.GET_PROJECT_BY_ID(projectId));     
      if (!response.ok) {
          throw new Error(`Error al obtener el proyecto con ID ${projectId}`);
      }
      const project = await response.json();
      console.log("proyecto", project);
      const task = project.tasks.find(task => task.id === taskId);
      if (task) {
          return task;
      } 
  } catch (error) {
      console.error("Error al obtener la tarea:", error);
      throw error;
  }
}