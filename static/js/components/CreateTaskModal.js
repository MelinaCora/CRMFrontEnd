//CreateTaskModal.js

import {getUsers}from"../services/userService.js";
import { getTaskStatus } from "../services/taskStatusService.js"; 
import { updateProjectTasks } from "../services/projectService.js"; 

const body = document.body;

export function openModal() {
    const modal = document.getElementById("taskModal");
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

    loadUsers();
    loadTaskStatuses();
}

export function closeModal() {
    const modal = document.getElementById("taskModal");
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

function loadUsers() {
    const userSelect = document.getElementById('userSelect');
    userSelect.innerHTML = ''; 

    getUsers()
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error cargando usuarios", error);
        });
}

function loadTaskStatuses() {
    const statusSelect = document.getElementById('statusSelect');
    statusSelect.innerHTML = '';  // Limpiar opciones previas

    getTaskStatus()
        .then(statuses => {
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status.id;
                option.textContent = status.name;
                statusSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error cargando estados", error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded");

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');  

    // Abrir el modal
    const openModalButton = document.querySelector(".add-task-btn");
    if (openModalButton) {
        openModalButton.addEventListener('click', () => {
            console.log("Botón de abrir modal clickeado");
            openModal();
        });
    } else {
        console.log("No se encontró el botón de abrir modal");
    }


    const closeModalButton = document.getElementById("closeTaskModalBtn");
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            console.log("Botón de cerrar modal clickeado");
            closeModal();
        });
    } else {
        console.log("No se encontró el botón de cerrar modal");
    }

    
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.onsubmit = (event) => {
            event.preventDefault();
            createTask(projectId);
        };
    }
});

// Función para crear una tarea
function createTask(projectId) {
    const taskDescription = document.getElementById('taskDescription').value;
    const userId = parseInt(document.getElementById('userSelect').value);
    const statusId = parseInt(document.getElementById('statusSelect').value);
    const dueDateInput = document.getElementById('TaskdueDate').value;

    // Verificar que los valores esenciales no estén vacíos
    if (!taskDescription || isNaN(userId) || isNaN(statusId) || !dueDateInput) {
        console.error("Por favor, complete todos los campos.");
        return; // No enviar la solicitud si falta algún dato
    }

    const taskData = {
        name: taskDescription,
        dueDate: new Date(dueDateInput).toISOString(), // Usar fecha seleccionada
        user: userId,
        status: statusId
    };

    updateProjectTasks(projectId, taskData)
        .then(response => {
            console.log("Tarea creada:", response);
            closeModal(); // Cerrar el modal después de crear la tarea
        })
        .catch(error => {
            console.error("Error creando tarea:", error);
        });
}