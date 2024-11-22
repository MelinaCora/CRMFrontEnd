import { PROJECT_URLS } from "../components/utilities.js";

/**
 * Obtiene la lista de usuarios disponibles.
 * @returns {Promise<Array>} Lista de usuarios.
 */
export const getUsers = async () => {
  try {
    const response = await fetch(PROJECT_URLS.GET_USERS);
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    return await response.json(); // Devuelve los usuarios en formato JSON.
  } catch (error) {
    console.error("Error in getUsers:", error);
    throw error; // Manejar el error o relanzarlo según el caso.
  }
};