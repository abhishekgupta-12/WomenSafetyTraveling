import { AUTH, LOGOUT,UPDATE_USER } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null};
      case UPDATE_USER:
        const updatedProfile = { ...state.authData, result: action?.data };
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
        return { ...state, authData: updatedProfile };
    default:
      return state;
  }
};

export default authReducer;
