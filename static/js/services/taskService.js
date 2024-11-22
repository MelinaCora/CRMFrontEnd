import { PROJECT_URLS } from "../components/utilities.js";


export const updateTask = async (taskId, taskData) => {
  try {
    const response = await fetch(PROJECT_URLS.UPDATE_TASK(taskId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Error updating task");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};