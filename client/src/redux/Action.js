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
export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const EVENT_DELETE = "EVENT_DELETE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
export const GET_ALL_EVENTS = "GET_ALL_EVENTS";



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

export const createEvent = ({payload,token}) => (dispatch) => {
  console.log(token)
  axios
    .post("http://localhost:3001/events", payload, {
      headers: { jwt: token },
    })
    .then(({ data }) => {
      dispatch({ type: ADD_EVENT, payload: data });
      toast.success("Event created successfully");
    })
    .catch((err) => {
      toast.error(err.message);
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

export const addFavourites = (payload,token) => (dispatch) => {
  axios
    .post("http://localhost:3001/user/favourites/add", payload, {
      headers: { jwt: token },
    })
    .then(({ data }) => {
      dispatch({ type: SET_FAVOURITES, payload: data.favourites });
      toast.success("Event added successfully!");
    })
    .catch((err) => {
      toast.error(err.message);
      console.log(err);
    });
};

export const eventDelete = (payload,token) => (dispatch) => {
  axios
    .delete(`http://localhost:3001/events/${payload}`, {
      headers: { jwt: token },
    })
    .then(() => toast.success("Event Deleted Successfully"))
    .catch((err) => toast.error(err.message));
};

export const removeFavourite = (payload,token) => (dispatch) => {
  axios
    .post("http://localhost:3001/user/favourites/remove", payload, {
      headers: { jwt: token },
    })
    .then(({ data }) => {
      dispatch({ type: SET_FAVOURITES, payload: data.favourites });
      toast.success("Removed from favourites successfully!");
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const getAllEvents = () => (dispatch) => {
  axios
    .get("http://localhost:3001/events", {
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: GET_ALL_EVENTS, payload: data.res });
    })
    .catch((err) => {
      console.log(err);
    });
};
