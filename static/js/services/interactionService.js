import { PROJECT_URLS } from "../components/utilities.js";


export const updateProjectInteraction = async (projectId, interactionData) => {
  try {
    const response = await fetch(PROJECT_URLS.UPDATE_PROJECT_INTERACTION(projectId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interactionData),
    });
    if (!response.ok) throw new Error("Error updating project interaction");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};