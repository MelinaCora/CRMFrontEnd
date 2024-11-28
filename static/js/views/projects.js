import { getProjectById } from "../services/projectService.js";
import { openEditModal } from '../components/updateAnExistingTaskModal.js';
import { showSpinner, hideSpinner } from "../components/spinners.js";

document.addEventListener('DOMContentLoaded', function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');       
    
    async function renderProject(projectId) {
      try {

        showSpinner();
        
        const projectData = await getProjectById(projectId);
        console.log("datos del proyecto: ", projectData);
  
        if (projectData) {
          
          const projectContainer = document.querySelector('.card-conteiner');
          const interactionsContainer = document.querySelector('.interaction-container');
          const tasksContainer = document.querySelector('.task-container');          
            
          
          projectContainer.innerHTML = `
            <h3>${projectData.data.name}</h3>
            <p><strong>Inicio:</strong> ${new Date(projectData.data.start).toLocaleString()}</p>
            <p><strong>Fin:</strong> ${new Date(projectData.data.end).toLocaleString()}</p>
            <p><strong>Campaña:</strong> ${projectData.data.campaignType.name}</p>
            <p><strong>Cliente:</strong> ${projectData.data.client.name}</p>
            <p><strong>Email:</strong> ${projectData.data.client.email}</p>
            <p><strong>Teléfono:</strong> ${ projectData.data.client.phone}</p>
            <p><strong>Compañía:</strong> ${projectData.data.client.company}</p>
            <p><strong>Dirección:</strong> ${projectData.data.client.address}</p>
          `;
  
          
          if (projectData.interactions && projectData.interactions.length > 0) {
            projectData.interactions.forEach(interaction => {
              const interactionDiv = document.createElement('div');
              interactionDiv.classList.add('interaction');
              interactionDiv.innerHTML = `
                <div class="interaction-card">
                  <span class="interaction-description">${interaction.notes}</span>
                  <span class="interaction-type">${interaction.interactionType ? interaction.interactionType.name : 'No disponible'}</span>
                </div>
              `;
              interactionsContainer.appendChild(interactionDiv);
            });
            if (projectData.interactions.length > 2) {
                interactionsContainer.classList.add('scrollable');
            }
          } else {
            const noInteractionsMessage = document.createElement('p');
            noInteractionsMessage.textContent = "No hay interacciones disponibles.";
            interactionsContainer.appendChild(noInteractionsMessage);
          }
  
          
          if (projectData.tasks && projectData.tasks.length > 0) {
            projectData.tasks.forEach(task => {
              const taskDiv = document.createElement('div');
              taskDiv.classList.add('task');
              taskDiv.innerHTML = `
                <div class="task-card">
                  <span class="task-name">${task.name}</span>
                  <span class="task-status">${task.status ? task.status.name : 'No disponible'}</span>
                  <span class="task-assigned">${task.userAssigned ? task.userAssigned.name : 'No disponible'}</span>
                  <button class="edit-btn" data-task-id="${task.id}" data-project-id="${projectId}">
                    <i class="fas fa-file-signature" style="color: white;font-size: 1.3rem;"></i>
                  </button>
                </div>
              `;
              tasksContainer.appendChild(taskDiv);
              
              const editButton = taskDiv.querySelector('.edit-btn');
        
              
              editButton.addEventListener('click', () => {
              
                openEditModal(task.id);
              });
            });
            if (projectData.tasks.length > 2) {
                tasksContainer.classList.add('scrollable');
            }
          } else {
            const noTasksMessage = document.createElement('p');
            noTasksMessage.textContent = "No hay tareas disponibles.";
            tasksContainer.appendChild(noTasksMessage);
          }
          
        }
      } catch (error) {
        console.error('Error al renderizar el proyecto:', error);
      }finally {
      hideSpinner();  
      }
    }  
    if (projectId) {
      renderProject(projectId);
    }
  });


