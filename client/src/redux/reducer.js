import { ADD_EVENT, SET_CATEGORIES, SET_EVENTS, SET_TOTAL_COUNT, SET_USER_ID, SET_USER_ROLE } from "./Action";

const init = { userID:null, totalCount:1, events: [] , userRole:null, categories:[]};

export const rootReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SET_EVENTS:
      return { ...state, events: payload };

    case SET_USER_ROLE:
        return { ...state, userRole:payload};

    case ADD_EVENT:
      return {...state, events:[...state.events,payload]}

    case SET_USER_ID:
      return {...state, userID:payload}

    case SET_CATEGORIES:
      return {...state, categories:payload}

    case SET_TOTAL_COUNT:
      return {...state, totalCount:payload}
    
    default:
      return state;
  }
};
