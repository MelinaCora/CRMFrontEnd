//projectService.js

import { PROJECT_URLS } from "../components/utilities.js";

/**
 * Obtiene proyectos con o sin filtros.
 * @param {number} offset - Número de página.
 * @param {number} size - Cantidad de proyectos por página.
 * @returns {Promise<Array>} Lista de proyectos.
 */


export const getProjects = async (offset = 0, size = 5, filters = {}) => {
  try {
    // Crear un objeto de parámetros para URLSearchParams
    const queryParams = new URLSearchParams();

    // Asignar correctamente cada filtro
    if (filters.projectName) {
      queryParams.append('name', filters.projectName); // Correcto para el nombre del proyecto
    }
    if (filters.client !== undefined && filters.client !== null) {
      queryParams.append('client', filters.client); // Correcto para cliente
    }
    if (filters.campaign !== undefined && filters.campaign !== null) {
      queryParams.append('campaign', filters.campaign); // Correcto para campaña
    }

    // Asegurarse de agregar offset y size como números
    queryParams.append('offset', offset);
    queryParams.append('size', size);

    // Construir la URL completa
    const url = `${PROJECT_URLS.GET_PROJECTS}?${queryParams.toString()}`;
    console.log('URL generada:', url);

    // Realizar la solicitud al backend
    const response = await fetch(url);

    // Validar la respuesta
    if (!response.ok) throw new Error("Error fetching projects");

    return await response.json();
  } catch (error) {
    console.error("Error al cargar los proyectos:", error);
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