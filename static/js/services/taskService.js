//taskService.js

import { PROJECT_URLS } from "../components/utilities.js";

export const updateTask = async (taskId, taskData) => {
  try {
    
    const formattedTask = {
      name: taskData.name,
      dueDate: taskData.dueDate,
      user: taskData.user,
      status: taskData.status,
    };

    const response = await fetch(PROJECT_URLS.UPDATE_TASK(taskId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedTask),
    });

    if (!response.ok) {
      throw new Error(`Error updating task: ${response.statusText}`);
    }

    // Retornar la respuesta en formato JSON
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    throw error;
  }
};

export async function getTaskById(projectId, taskId) {
  try {  
      console.log("Proyecto ID: ", projectId, "Tarea ID: ", taskId);    

      // Solicita el proyecto por ID
      const response = await fetch(PROJECT_URLS.GET_PROJECT_BY_ID(projectId));     
      if (!response.ok) {
          throw new Error(`Error al obtener el proyecto con ID ${projectId}`);
      }

      // Obtén el proyecto
      const project = await response.json();
      console.log("Proyecto obtenido:", project);

      // Verifica si el proyecto tiene tareas
      if (!project.tasks || project.tasks.length === 0) {
          console.error("No se encontraron tareas en el proyecto.");
          throw new Error("No se encontraron tareas en el proyecto.");
      }

      // Busca la tarea específica
      const task = project.tasks.find(task => task.id.trim() === taskId.trim());
      console.log("Comparando IDs:", taskId, "con tareas:", project.tasks.map(t => t.id));

      if (task) {
          console.log("Tarea encontrada:", task);
          return task;
      } else {
          console.error(`No se encontró la tarea con ID ${taskId} en el proyecto ${projectId}`);
          throw new Error(`No se encontró la tarea con ID ${taskId}`);
      }

  } catch (error) {
      console.error("Error al obtener la tarea:", error);
      throw error;
  }
}