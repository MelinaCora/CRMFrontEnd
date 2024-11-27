// updateAnExistingTaskModal.js

import { getUsers } from "../services/userService.js";
import { getTaskStatus } from "../services/taskStatusService.js";
import { updateTask } from "../services/taskService.js";
import { getTaskById } from "../services/taskService.js";

const body = document.body;

export function openEditModal(projectId,taskId) {

    console.log("Abriendo modal para tarea con ID:", taskId, "y proyecto con ID:", projectId);
    const modal = document.getElementById("editTaskModal");
    console.log("Abriendo modal de edición...");    

    if (modal) {
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
        modal.style.display = "flex";
        body.classList.add("no-scroll");
        modal.classList.remove("hidden");
        console.log("Modal abierto");

        loadTaskData(projectId,taskId);
        loadUsers();
        loadTaskStatuses();
    } else {
        console.log("No se encontró el modal de edición");
    }
}

export function closeEditModal() {
    const modal = document.getElementById("editTaskModal");
    console.log("Cerrando modal de edición...");

    if (modal) {
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
        modal.style.display = "none";
        body.classList.remove("no-scroll");
        modal.classList.add("hidden");
        console.log("Modal cerrado");
    } else {
        console.log("No se encontró el modal de edición");
    }
}

function loadUsers() {
    const userSelect = document.getElementById('editUserSelect');
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
    const statusSelect = document.getElementById('editStatusSelect');
    statusSelect.innerHTML = ''; 

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

function loadTaskData(projectId, taskId) {
    getTaskById(projectId, taskId)
        .then(task => {
            document.getElementById('editTaskDescription').value = task.name;
            document.getElementById('editUserSelect').value = task.userAssigned.id;
            document.getElementById('editStatusSelect').value = task.status.id;
            const dueDate = task.dueDate.split('T')[0];
            document.getElementById('editDueDate').value = dueDate;           
            const editTaskForm = document.getElementById('editTaskForm');
            editTaskForm.setAttribute('data-task-id', taskId);
        })
        .catch(error => {
            console.error("Error cargando datos de la tarea", error);
        });
}

function updateTaskData(event, taskId) {
    event.preventDefault();

    const description = document.getElementById('editTaskDescription').value;
    const userId = parseInt(document.getElementById('editUserSelect').value);
    const statusId = parseInt(document.getElementById('editStatusSelect').value);
    const dueDate = document.getElementById('editDueDate').value;

    const updatedTask = {
        description,
        userId,
        statusId,
        dueDate
    };

    // Llamar al servicio para actualizar la tarea
    updateTask(taskId, updatedTask)
        .then(response => {
            console.log("Tarea actualizada exitosamente", response);
            closeEditModal(); // Cerrar el modal después de actualizar
        })
        .catch(error => {
            console.error("Error actualizando la tarea", error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded"); 
         
    body.addEventListener('click', function (event) {
        if (event.target && event.target.matches(".edit-btn")) {
            const taskId = event.target.getAttribute('data-task-id');
            const projectId = event.target.getAttribute('data-project-id');
            console.log("Botón de abrir modal clickeado para tarea con ID:", taskId, "y projectId:", projectId);
            openEditModal(projectId, taskId); 
        }
    });

    const closeModalButton = document.getElementById("closeEditTaskModalBtn");
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            console.log("Botón de cerrar modal clickeado");
            closeEditModal();
        });
    } else {
        console.log("No se encontró el botón de cerrar modal");
    }
    
    const editTaskForm = document.getElementById('editTaskForm');
    if (editTaskForm) {
        editTaskForm.onsubmit = (event) => {
            const taskId = editTaskForm.getAttribute('data-task-id');
            updateTaskData(event, taskId);
        };
    }
});