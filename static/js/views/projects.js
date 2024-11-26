import { getProjectById } from "../services/projectService.js"; // Importa el servicio

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el ID del proyecto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id'); // Suponiendo que la URL es algo como /project.html?id=ID
  
    // Función para obtener y renderizar el proyecto
    async function renderProject(projectId) {
      try {
        // Llamamos al servicio para obtener el proyecto por ID
        const projectData = await getProjectById(projectId);
        console.log("datos del proyecto: ", projectData);
  
        if (projectData) {
          // Verificar que las propiedades existen
          const projectContainer = document.querySelector('.card-conteiner');
          const interactionsContainer = document.querySelector('.interaction-container');
          const tasksContainer = document.querySelector('.task-container');          
            
          // Renderizar el proyecto
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
  
          // Renderizar las interacciones
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
          } else {
            const noInteractionsMessage = document.createElement('p');
            noInteractionsMessage.textContent = "No hay interacciones disponibles.";
            interactionsContainer.appendChild(noInteractionsMessage);
          }
  
          // Renderizar las tareas
          if (projectData.tasks && projectData.tasks.length > 0) {
            projectData.tasks.forEach(task => {
              const taskDiv = document.createElement('div');
              taskDiv.classList.add('task');
              taskDiv.innerHTML = `
                <div class="task-card">
                  <span class="task-name">${task.name}</span>
                  <span class="task-status">${task.status ? task.status.name : 'No disponible'}</span>
                  <span class="task-assigned">${task.userAssigned ? task.userAssigned.name : 'No disponible'}</span>
                  <button class="edit-btn">✏️</button>
                </div>
              `;
              tasksContainer.appendChild(taskDiv);
            });
          } else {
            const noTasksMessage = document.createElement('p');
            noTasksMessage.textContent = "No hay tareas disponibles.";
            tasksContainer.appendChild(noTasksMessage);
          }
        }
      } catch (error) {
        console.error('Error al renderizar el proyecto:', error);
      }
    }
  
    // Llamar a la función para renderizar el proyecto
    if (projectId) {
      renderProject(projectId);
    }
  });


