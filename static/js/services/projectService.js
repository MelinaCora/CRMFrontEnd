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
    
    const queryParams = new URLSearchParams();

    // Asignar correctamente cada filtro
    if (filters.projectName) {
      queryParams.append('name', filters.projectName);
    }
    if (filters.client !== undefined && filters.client !== null) {
      queryParams.append('client', filters.client);
    }
    if (filters.campaign !== undefined && filters.campaign !== null) {
      queryParams.append('campaign', filters.campaign);
    }

    
    queryParams.append('offset', offset);
    queryParams.append('size', size);

    // Construir la URL completa
    const url = `${PROJECT_URLS.GET_PROJECTS}?${queryParams.toString()}`;
    console.log('URL generada:', url);

    
    const response = await fetch(url);

    
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
    
    const requestBody = {
      name: projectData.name,
      start: new Date(projectData.startDate).toISOString(), 
      end: new Date(projectData.endDate).toISOString(),
      client: parseInt(projectData.client, 10), 
      campaignType: parseInt(projectData.campaignType, 10)
    };    
    console.log("Enviando datos al servidor:", requestBody);    
    const response = await fetch(PROJECT_URLS.CREATE_PROJECT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), 
    });
    
    if (!response.ok) {      
      const errorDetails = await response.json();
      console.error("Error al crear el proyecto:", errorDetails);
      
      throw new Error(errorDetails.message || "Error creating project");
    }    
    return await response.json();
  } catch (error) {    
    console.error("Ocurrió un error al intentar crear el proyecto:", error);
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
    const formattedInteractions = {
      notes: interaction.notes,
      date: interaction.date, 
      interactionType: interaction.interactionType
    };
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
   
    const formattedTask = {
      name: task.name,
      dueDate: task.dueDate,
      user: task.user,
      status: task.status
    };    
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