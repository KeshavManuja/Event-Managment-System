import axios from "axios";
export const SET_EVENTS = "SET_EVENTS";
export const SET_USER_ROLE = "SET_USER_ROLE";
export const DELETE_USER_ROLE = "DELETE_USER_ROLE";
export const ADD_EVENT = "ADD_EVENT";

export const getEvents = () => (dispatch) => {
  axios
    .get("http://localhost:3001/events")
    .then(({ data }) => {
      dispatch({ type: SET_EVENTS, payload: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setUSerRole = (role) => ({
  type: SET_USER_ROLE,
  payload: role,
});

export const deleteUSerRole = () => (
  {
    type:DELETE_USER_ROLE,
    payload:null
  }
)

export const createEvent = (payload) => (dispatch) => {
  axios
    .post("http://localhost:3001/events",payload)
    .then(({ data }) => {
      dispatch({ type: ADD_EVENT, payload: data });
    })
    .catch((err) => {
      console.log(err);
    });
}
