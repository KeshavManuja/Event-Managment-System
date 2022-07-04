import { ADD_EVENT, ADD_FAVOURITES, GET_ALL_EVENTS, GET_FAVOURITES, GET_MY_EVENTS, REMOVE_FAVOURITE, SET_CATEGORIES, SET_EVENTS, SET_FAVOURITES, SET_TAGS, SET_TOTAL_COUNT, SET_USER_ID, SET_USER_ROLE } from "./Action";

export const init = { userFav: [], userID: null, totalCount: 1, events: [], userRole: null, categories: [], myEvents: [] , tags:[]};

export const rootReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SET_EVENTS:
      return { ...state, events: payload };

    case SET_USER_ROLE:
      return { ...state, userRole: payload };

    case ADD_EVENT:
      return { ...state, events: [...state.events, payload] }

    case SET_USER_ID:
      return { ...state, userID: payload }

    case SET_CATEGORIES:
      return { ...state, categories: payload }

    case SET_TOTAL_COUNT:
      return { ...state, totalCount: payload };

    case ADD_FAVOURITES:
      return { ...state, userFav: [...state.userFav, payload] }

    case SET_FAVOURITES:
      return { ...state, userFav: payload }

    case REMOVE_FAVOURITE:
      return { ...state, userFav: payload }

    case GET_MY_EVENTS:
      return { ...state, myEvents: payload };

    case SET_TAGS:
      return { ...state , tags: payload}

    default:
      return state;
  }
};
