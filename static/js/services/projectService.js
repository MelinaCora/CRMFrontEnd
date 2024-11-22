import { PROJECT_URLS } from "../components/utilities.js";

/**
 * Obtiene todos los proyectos.
 * @returns {Promise<Array>} Lista de estados de tareas.
 */

export const getProjects = async () => {  
  try {
    const response = await fetch(PROJECT_URLS.GET_PROJECTS);
    if (!response.ok) throw new Error("Error fetching projects");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await fetch(PROJECT_URLS.GET_PROJECT_BY_ID(id));
    if (!response.ok) throw new Error("Error fetching project by ID");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await fetch(PROJECT_URLS.CREATE_PROJECT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: projectData.name,
        start: projectData.startDate, 
        end: projectData.endDate, 
        client: parseInt(projectData.client), 
        campaignType: parseInt(projectData.campaignType) 
      }),
    });

    if (!response.ok) throw new Error("Error creating project");

    // Si la respuesta es exitosa, retorna la respuesta en formato JSON
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};