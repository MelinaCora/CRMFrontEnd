const BASE_PROJECT_URL = 'https://localhost:7222/api/v1';

//Para realizar llamadas a las URL

export const PROJECT_URLS = {

    GET_PROJECTS:`${BASE_PROJECT_URL}/Project`,
    CREATE_PROJECT:`${BASE_PROJECT_URL}/Project`,
    GET_PROJECT_BY_ID: (id) => `${BASE_PROJECT_URL}/Project/${id}`,
    UPDATE_PROJECT_INTERACTION:(id) =>`${BASE_PROJECT_URL}/Project/${id}/interactions`,
    UPDATE_PROJECT_TASK:(id) =>`${BASE_PROJECT_URL}/Project/${id}/tasks`,
    UPDATE_TASK: (id) =>`${BASE_PROJECT_URL}/Tasks/${id}`,
    GET_CAMPAIGNTYPES: `${BASE_PROJECT_URL}/CampaignType`,
    GET_CLIENTS:`${BASE_PROJECT_URL}/Client`,
    GET_INTERACTIONTYPES: `${BASE_PROJECT_URL}/InteractionTypes`,
    GET_TASKSTATUS: `${BASE_PROJECT_URL}/TaskStatus`,
    GET_USERS:`${BASE_PROJECT_URL}/User`,
}

