import { getProjects } from "../services/projectService.js";
import { getProjectById } from "../services/projectService.js";

const loadProjects = async () => {
    const container = document.getElementById("projects-container");

    try {
        const projects = await getProjects();
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
    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
        container.innerHTML = `<p>Error al cargar los proyectos. Por favor, inténtalo más tarde.</p>`;
    }
};

document.addEventListener('DOMContentLoaded', loadProjects);