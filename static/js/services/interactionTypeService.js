import { PROJECT_URLS } from "../components/utilities.js";

/**
 * Obtiene todos los estados de las tareas.
 * @returns {Promise<Array>} Lista de estados de tareas.
 */

export const getInteractionTypes = async () => {
    try {
      const response = await fetch(PROJECT_URLS.GET_INTERACTIONTYPES);
      if (!response.ok) {
        throw new Error("Error fetching interaction types");
      }
      return await response.json(); // Devuelve los datos en formato JSON.
    } catch (error) {
      console.error("Error in getInteractionTypes:", error);
      throw error; // Puedes manejar el error o lanzar uno nuevo.
    }
  };