import { updateProjectInteractions } from "../services/projectService.js";
import { getInteractionTypes } from "../services/interactionTypeService.js";

const body = document.body;

/**
 * Abre el modal para agregar una interacción.
 * @param {number} projectId - ID del proyecto.
 */
export function openInteractionModal(projectId) {
    const modal = document.getElementById("interactionModal");
    if (modal) {
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
        modal.style.display = "flex";
        body.classList.add("no-scroll");
        modal.classList.remove("hidden");

        // Guardar el projectId en el modal
        modal.dataset.projectId = projectId;

        loadInteractionTypes();
    } else {
        console.error("No se encontró el modal de interacciones.");
    }
}

/**
 * Cierra el modal de interacciones.
 */
export function closeInteractionModal() {
    const modal = document.getElementById("interactionModal");
    if (modal) {
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
        modal.style.display = "none";
        body.classList.remove("no-scroll");
        modal.classList.add("hidden");
    } else {
        console.error("No se encontró el modal de interacciones.");
    }
}

/**
 * Carga los tipos de interacción en el select.
 */
function loadInteractionTypes() {
    const typeSelect = document.getElementById("interactionTypeSelect");
    typeSelect.innerHTML = "";

    getInteractionTypes()
        .then(types => {
            types.forEach(type => {
                const option = document.createElement("option");
                option.value = type.id;
                option.textContent = type.name;
                typeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error cargando tipos de interacción:", error);
        });
}

/**
 * Envía los datos para crear una interacción.
 */
function createInteraction() {
    const modal = document.getElementById("interactionModal");
    const projectId = modal.dataset.projectId;
    const notes = document.getElementById("interactionDescription").value;
    const interactionType = parseInt(document.getElementById("interactionTypeSelect").value);
    const dateInput = document.getElementById("dueDate").value;

    if (!notes || isNaN(interactionType) || !dateInput) {
        console.error("Por favor, complete todos los campos.");
        return;
    }

    const interactionData = {
        notes,
        date: new Date(dateInput).toISOString(),
        interactionType
    };

    updateProjectInteractions(projectId, interactionData)
        .then(response => {
            console.log("Interacción creada:", response);
            closeInteractionModal(); 
        })
        .catch(error => {
            console.error("Error creando interacción:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const openModalButton = document.querySelector(".add-interaction-btn");
    if (openModalButton) {
        openModalButton.addEventListener("click", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get("id");
            if (projectId) {
                openInteractionModal(projectId);
            } else {
                console.error("No se encontró projectId en la URL.");
            }
        });
    }
    const closeModalButton = document.getElementById("closeInteractionModalBtn");
    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeInteractionModal);
    }
    const interactionForm = document.getElementById("interactionForm");
    if (interactionForm) {
        interactionForm.onsubmit = event => {
            event.preventDefault();
            createInteraction();
        };
    }
});