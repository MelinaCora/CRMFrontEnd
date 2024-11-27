//index.js

import { getProjects } from "../services/projectService.js";
import { getClients } from "../services/clientService.js";
import { getCampaignTypes } from "../services/campaignTypeService.js";

let currentPage = 0;
const pageSize = 3;

const loadFilters = async () => {
    try {
      const clients = await getClients();      
      console.log("clientes obtenidos: ", clients)
      const campaigns = await getCampaignTypes();
      console.log("campañas obtenidss: ", campaigns)
  
      const clientSelect = document.getElementById("filterByClient");
        const campaignSelect = document.getElementById("filterByCampaign");
  
      clients.forEach(client => {
        clientSelect.innerHTML += `<option value="${client.id}">${client.name}</option>`;
      });
  
      campaigns.forEach(campaign => {
        campaignSelect.innerHTML += `<option value="${campaign.id}">${campaign.name}</option>`;
      });
    } catch (error) {
      console.error("Error loading filters:", error);
    }
  };

const loadProjects = async (filters = {}) => {
    const container = document.getElementById("projects-container");

    try {
        // Construir los filtros correctamente
        const queryFilters = {
            projectName: filters.projectName || undefined, // Asignar el nombre del proyecto si existe
            campaign: filters.campaignId || undefined, // Asignar campaignId si existe
            client: filters.clientId || undefined, // Asignar clientId si existe
        };

        // Calcular offset para paginación
        const offset = currentPage * pageSize;

        // Llamar a la función getProjects con los filtros y parámetros de paginación
        const projects = await getProjects(offset, pageSize, queryFilters);

        // Mostrar los proyectos en el contenedor
        container.innerHTML = projects.map(project => `
            <div class="project-card" onclick="window.location.href = 'Project.html?id=${project.id}'">
                <div class="card-conteiner">
                    <h2>${project.name}</h2>
                    <p><strong>Cliente:</strong> ${project.client.name}</p>
                    <p><strong>Campaña:</strong> ${project.campaignType.name}</p>
                    <p><strong>Inicio:</strong> ${new Date(project.start).toLocaleDateString()}</p>
                    <p><strong>Fin:</strong> ${new Date(project.end).toLocaleDateString()}</p>
                </div>
            </div>
        `).join('');

        // Actualizar los botones de paginación
        updatePaginationButtons(projects);
    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
        container.innerHTML = `<p>Error al cargar los proyectos. Por favor, inténtalo más tarde.</p>`;
    }
};

// Función para manejar el cambio de página
const changePage = (direction) => {
  if (direction === "next") {
    currentPage++;
  } else if (direction === "prev" && currentPage > 0) {
    currentPage--;
  }
  loadProjects();
};

// Listeners para los botones de paginación
document.querySelector(".pagination").addEventListener("click", (event) => {
  if (event.target.classList.contains("pagination-btn")) {
    const direction = event.target.textContent === "⟩" ? "next" : "prev";
    changePage(direction);
  }
});

const updatePaginationButtons = (projects) => {
    const prevButton = document.querySelector(".pagination-btn:first-child");
    const nextButton = document.querySelector(".pagination-btn:last-child");
  
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = projects.length < pageSize;
};


// Manejo del botón de aplicar filtros
document.getElementById("applyNameFilter").addEventListener("click", () => {
    const projectName = document.getElementById("filterByName").value;
    loadProjects({ projectName });
});

document.getElementById("applyClientFilter").addEventListener("click", () => {
    const clientId = document.getElementById("filterByClient").value;
    loadProjects({ clientId });
});

document.getElementById("applyCampaignFilter").addEventListener("click", () => {
    const campaignId = document.getElementById("filterByCampaign").value;
    loadProjects({ campaignId });
});

document.getElementById("clearFilters").addEventListener("click", () => {
    // Limpiar los filtros
    document.getElementById("filterByName").value = '';
    document.getElementById("filterByClient").value = '';
    document.getElementById("filterByCampaign").value = '';
    loadProjects(); 
});

// Cargar filtros y proyectos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadFilters();
    loadProjects();
});

document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.getElementById("openFilterButton");
    const filterContainer = document.getElementById("filterContainer");

    console.log(filterButton);  // Verifica que el botón sea encontrado
    console.log(filterContainer);  // Verifica que el contenedor sea encontrado

});
