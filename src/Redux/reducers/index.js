import { LOGIN, LOGOUT } from "../actions";
import Firebase from "../../Config/Firebase";


export let initialState = {
    user: localStorage.getItem("@3lfraza/user") ? JSON.parse(localStorage.getItem("@3lfraza/user")) : null
};

export const stateReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const user = action.user;
      localStorage.setItem("@3lfraza/user", JSON.stringify(user));
      return {
        ...state,
        user
      };
    case LOGOUT:
      localStorage.clear();
      Firebase.auth().signOut();
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
