import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser } from "state";

export const deleteUserThunk = createAsyncThunk(
  'auth/deleteUserThunk',
  async (userId, { getState, dispatch }) => {
    const token = getState().auth.token;
    const response = await fetch(`https://snapgram-backend-7c1s.onrender.com/users/${userId}`, {
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
