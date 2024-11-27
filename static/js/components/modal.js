// createProjectModal.js
import { getCampaignTypes } from "../services/campaignTypeService.js";
import { getClients } from "../services/clientService.js";
import { createProject } from "../services/projectService.js";
import { 
    showProjectAddSuccesAlert,
    showTaskAddSuccesAlert,
    showInteractionAddSuccesAlert,
    showTaskUpdateSuccesAlert,
    showErrorAlert 
} from "../components/alerts.js";

const body = document.body;

export function openModal() {
    const modal = document.getElementById("newProjectModal");
    console.log("Abriendo modal...");
    if (modal) {
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
        modal.style.display = "flex";
        body.classList.add("no-scroll");
        modal.classList.remove("hidden");
        console.log("Modal abierto");
    } else {
        console.log("No se encontró el modal");
    }
    loadCampaigns();
    loadClients(); 
}

export function closeModal() {
    const modal = document.getElementById("newProjectModal");
    console.log("Cerrando modal...");
    if (modal) {
        modal.style.visibility = "hidden"; 
        modal.style.opacity = "0";
        modal.style.display = "none";
        body.classList.remove("no-scroll");
        modal.classList.add("hidden");
        console.log("Modal cerrado");
    } else {
        console.log("No se encontró el modal");
    }
}

function loadCampaigns() {
    const campaignSelect = document.getElementById('campaignType');
    campaignSelect.innerHTML = ''; 
    getCampaignTypes()
        .then(campaigns => {
            campaigns.forEach(campaign => {
                const option = document.createElement('option');
                option.value = campaign.id;
                option.textContent = campaign.name;
                campaignSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading campaigns", error);
        });
}

function loadClients() {
    const clientSelect = document.getElementById('client');
    clientSelect.innerHTML = ''; 
    getClients()
        .then(clients => {
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.id;
                option.textContent = client.name;
                clientSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading clients", error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded");
    
    const openModalButton = document.getElementById("openNewProjectModal");
    if (openModalButton) {
        openModalButton.addEventListener('click', () => {
            console.log("Botón de abrir modal clickeado");
            openModal();
        });
    } else {
        console.log("No se encontró el botón de abrir modal");
    }

    
    const closeModalButton = document.getElementById("closeModalBtn");
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            console.log("Botón de cerrar modal clickeado");
            closeModal();
        });
    } else {
        console.log("No se encontró el botón de cerrar modal");
    }

    
    const newProjectForm = document.getElementById('newProjectForm');
    if (newProjectForm) {
        newProjectForm.onsubmit = (event) => {
            event.preventDefault();
            createNewProject();
        };
    }
});

function createNewProject() {

    const projectName = document.getElementById('projectName').value;
    const campaignType = parseInt(document.getElementById('campaignType').value); 
    const client = parseInt(document.getElementById('client').value); 
    const startDate = new Date(document.getElementById('startDate').value).toISOString();
    const endDate = new Date(document.getElementById('endDate').value).toISOString();
    
    if (!projectName || isNaN(campaignType) || isNaN(client) || !startDate || !endDate) {
        console.error("Por favor, complete todos los campos.");
        showErrorAlert();
        return; 
    }
    

    const projectData = {
        name: projectName,
        campaignType: campaignType,
        client: client,
        startDate: startDate,
        endDate: endDate
    };

    createProject(projectData)
        .then(response => {
            console.log('Proyecto creado', response);
            showProjectAddSuccesAlert();
            closeModal();
        })
        .catch(error => {
            console.error("Error creando proyecto", error);
            showErrorAlert();
        });
}