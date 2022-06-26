import { ADD_EVENT, SET_EVENTS, SET_USER_ROLE } from "./Action";

const init = { user: [], events: [] , userRole:null};

export const rootReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SET_EVENTS:
      return { ...state, events: payload };

    case SET_USER_ROLE:
        return { ...state, userRole:payload};

    case ADD_EVENT:
      return {...state, events:[...state.events,payload]}

    default:
      return state;
  }
};
