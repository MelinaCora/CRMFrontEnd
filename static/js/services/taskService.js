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
      // Realizamos la solicitud GET a la API usando el projectId
      const response = await fetch(PROJECT_URLS.GET_PROJECT_BY_ID(projectId));

      // Verificamos si la respuesta es exitosa
      if (!response.ok) {
          throw new Error(`Error al obtener el proyecto con ID ${projectId}`);
      }

      // Parseamos la respuesta como JSON
      const project = await response.json();

      // Buscamos la tarea dentro del proyecto usando taskId
      const task = project.tasks.find(task => task.id === taskId);

      // Si encontramos la tarea, la devolvemos
      if (task) {
          return task;
      } else {
          throw new Error(`Tarea con ID ${taskId} no encontrada en el proyecto ${projectId}`);
      }
  } catch (error) {
      console.error("Error al obtener la tarea:", error);
      throw error;
  }
}