import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser } from "state";

export const deleteUserThunk = createAsyncThunk(
  'auth/deleteUserThunk',
  async (userId, { getState, dispatch }) => {
    const token = getState().auth.token;
    const host = process.env.REACT_APP_SERVER_URL;
    const response = await fetch(`${host}/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      dispatch(deleteUser());
    } else {
      throw new Error("Failed to delete account");
    }
  }
);
