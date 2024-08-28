import { AUTH, UPDATE_USER } from "../constants/actionTypes";
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


// Update user action
export const updateUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData);
    dispatch({ type: UPDATE_USER, data });
    // Update local storage if needed
    localStorage.setItem('profile', JSON.stringify({ ...JSON.parse(localStorage.getItem('profile')), result: data }));
  } catch (error) {
    console.error("Update Error:", error);
    // Optionally, dispatch an error action or show an error message to the user
  }
};