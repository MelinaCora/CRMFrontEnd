import { getProjects } from "../services/projectService.js";
import { getProjectById } from "../services/projectService.js";

let currentPage = 0;
const pageSize = 5;

const loadProjects = async () => {
  const container = document.getElementById("projects-container");

  try {
    // Cargar proyectos según el offset y limit
    const projects = await getProjects(currentPage * pageSize, pageSize);
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
  loadProjects(); // Volver a cargar los proyectos con la nueva página
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

// Cargar proyectos al cargar la página
document.addEventListener('DOMContentLoaded', loadProjects);