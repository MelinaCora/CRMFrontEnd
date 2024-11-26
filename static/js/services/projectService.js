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

/**
 * Actualiza las interacciones de un proyecto.
 * @param {number} projectId - ID del proyecto.
 * @param {Object} interaction - Interacción a enviar.
 * @returns {Promise} Respuesta del servidor.
 */
export const updateProjectInteractions = async (projectId, interaction) => {
  try {
    const formattedInteractions = interaction.map(interaction => ({
      notes: interaction.notes,
      date: interaction.date, // Asegurarse de que esté en el formato ISO 8601
      interactionType: interaction.interactionType
    }));
    const response = await fetch(PROJECT_URLS.UPDATE_PROJECT_INTERACTION(projectId), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formattedInteractions)
    });

    if (!response.ok) throw new Error("Error updating project interactions");

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar interacciones:", error);
    throw error;
  }
};

export const updateProjectTasks = async (projectId, task) => {
  try {
    // Formatear la tarea en el formato requerido por el endpoint
    const formattedTask = {
      name: task.name,
      dueDate: task.dueDate,
      user: task.user,
      status: task.status
    };

    // Hacer la solicitud al servidor
    const response = await fetch(PROJECT_URLS.UPDATE_PROJECT_TASK(projectId), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formattedTask)
    });  

    if (!response.ok) throw new Error("Error updating project tasks");

    return await response.json(); 
  } catch (error) {
    console.error("Error al actualizar tareas:", error);
    throw error; 
  }
};