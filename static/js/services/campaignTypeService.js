import { PROJECT_URLS } from "../components/utilities.js";

/**
 * Obtiene todos los estados de las tareas.
 * @returns {Promise<Array>} Lista de estados de tareas.
 */

export const getCampaignTypes = async () => {
  try {
    const response = await fetch(PROJECT_URLS.GET_CAMPAIGNTYPES);
    if (!response.ok) throw new Error("Error fetching campaign types");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};