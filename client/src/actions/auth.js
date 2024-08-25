import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

// Signin action
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate('/'); // use navigate for navigation
  } catch (error) {
    console.error("Signin Error:", error); // Improved error logging
    // Optionally, dispatch an error action or show an error message to the user
  }
};

// Signup action
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/'); // use navigate for navigation
  } catch (error) {
    console.error("Signup Error:", error); // Improved error logging
    // Optionally, dispatch an error action or show an error message to the user
  }
};
