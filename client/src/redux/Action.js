import axios from "axios";
import { toast } from "react-toastify";
export const SET_EVENTS = "SET_EVENTS";
export const SET_USER_ROLE = "SET_USER_ROLE";
export const DELETE_USER_ROLE = "DELETE_USER_ROLE";
export const ADD_EVENT = "ADD_EVENT";
export const SET_USER_ID = "SET_USER_ID";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_FAVOURITES = "SET_FAVOURITES";
export const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
export const ADD_FAVOURITES = "ADD_FAVOURITES";
export const GET_FAVOURITES = "GET_FAVOURITES";
export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const EVENT_DELETE = "EVENT_DELETE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
export const GET_ALL_EVENTS = "GET_ALL_EVENTS";
export const FETCH_USER = "FETCH_USER";
export const GET_MY_EVENTS = "GET_MY_EVENTS";


export const getEvents = (path = "") => (dispatch) => {
  axios
    .get(`http://localhost:3001/events${path}`)
    .then(({ data }) => {
      dispatch({ type: SET_EVENTS, payload: data.res });
      dispatch({ type: SET_TOTAL_COUNT, payload: data.pages });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFavourites = (userID, page = 1, token) => (dispatch) => {
  console.log(page)
  axios.get(`http://localhost:3001/user/favourites/${userID}/${page}`, {
    headers: { jwt: token }
  })
    .then(({ data }) => {
      console.log(data)
      dispatch({ type: SET_FAVOURITES, payload: data.favEvents })
      dispatch({ type: SET_TOTAL_COUNT, payload: data.pages });

    }).catch((err) => {
      toast.error(err.message)
    })
}

export const setFavourites = (data) => ({
  type: SET_FAVOURITES,
  payload: data,
});


export const isLoggedIn = () => ({
  type: IS_LOGGED_IN,
});

export const setUSerRole = (role) => ({
  type: SET_USER_ROLE,
  payload: role,
});

export const setUserID = (id) => ({
  type: SET_USER_ID,
  payload: id,
});

export const deleteUSerRole = () => ({
  type: DELETE_USER_ROLE,
  payload: null,
});

export const createEvent = ({ payload, token }) => (dispatch) => {

  axios
    .post("http://localhost:3001/events", payload, {
      headers: { jwt: token },
    })
    .then(({ data }) => {
      dispatch({ type: ADD_EVENT, payload: data });
      toast.success("Event created successfully");
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};

export const setCategories = () => (dispatch) => {
  axios
    .get("http://localhost:3001/events/category", {
    })
    .then(({ data }) => {
      dispatch({ type: SET_CATEGORIES, payload: data });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const addFavourites = (favEvent, userID, token) => (dispatch) => {
  const payload = { favEvent, userID }
  axios
    .post("http://localhost:3001/user/favourites/add", payload, {
      headers: { jwt: token },
    })
    .then(({ data }) => {
      dispatch({ type: ADD_FAVOURITES, payload: data });
      toast.success("Event added to favourites successfully!");
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const eventDelete = (eventID, page, token) => (dispatch) => {
  axios
    .delete(`http://localhost:3001/events/${eventID}`, {
      headers: { jwt: token },
    })
    .then(() => {
      dispatch(getEvents(`?page=${page}`));
      toast.success("Event Deleted Successfully");
    })
    .catch((err) => toast.error(err.message));
};

export const removeFavourite = (favEvent, userID, token) => (dispatch) => {
  const payload = { userID, favEvent };
  axios
    .post("http://localhost:3001/user/favourites/remove", payload, {
      headers: { jwt: token },
    })
    .then(({ data }) => {
      console.log('in remove: ', data);
      dispatch({ type: SET_FAVOURITES, payload: data.favourites });
      toast.success("Removed from favourites successfully!");
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const getMyEvents = (userID, page = 1, token) => (dispatch) => {
  axios
    .get(`http://localhost:3001/events/myevents/${userID}/${page}`, {
      headers: { jwt: token }
    })
    .then(({ data }) => {
      console.log(data)
      dispatch({ type: GET_MY_EVENTS, payload: data.events });
      dispatch({ type: SET_TOTAL_COUNT, payload: data.pages });

    })
    .catch((err) => {
      toast.err(err.message);
    })

}