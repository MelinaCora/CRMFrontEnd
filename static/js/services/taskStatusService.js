import { PROJECT_URLS } from "../components/utilities.js";

/**
 * Obtiene todos los estados de las tareas.
 * @returns {Promise<Array>} Lista de estados de tareas.
 */
export const getTaskStatus = async () => {
  try {
    const response = await fetch(PROJECT_URLS.GET_TASKSTATUS);
    if (!response.ok) {
      throw new Error("Error fetching task statuses");
    }
    return await response.json(); // Devuelve los estados en formato JSON.
  } catch (error) {
    console.error("Error in getTaskStatus:", error);
    throw error; // Manejar el error o relanzarlo según el caso.
  }
};