import { PROJECT_URLS } from "../components/utilities.js";

/**
 * Obtiene todos los estados de las tareas.
 * @returns {Promise<Array>} Lista de estados de tareas.
 */

export const getClients = async () => {
    try {
      const response = await fetch(PROJECT_URLS.GET_CLIENTS);
      if (!response.ok) throw new Error("Error fetching clients");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
};
  