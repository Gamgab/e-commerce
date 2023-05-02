import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

const initialState = {
  list: [],
  status: null,
};

// FETCH via l'API
export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const response = await axios.get(`${url}/user`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// EDITER via l'API
/*
export const usersEdit = createAsyncThunk(
  "users/usersEdit",
  // "values" est l'objet que l'on reçoit de l'appel de la fonction
  async (values, { getState }) => {
    const state = getState();

    let currentUser = state.users.list.filter((user) => user._id === values.id);

    const newUser = {
      ...currentUser[0],
      delivery_status: values.delivery_status,
    };

    try {
      const response = await axios.put(
        `${url}/user/${values.id}`,
        newUser,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
*/

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    /*
    [usersEdit.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersEdit.fulfilled]: (state, action) => {
      const updateUsers = state.list.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      state.list = updateUsers;
      state.status = "success";
    },
    [usersEdit.rejected]: (state, action) => {
      state.status = "rejected";
    },
*/
  },
});

export default usersSlice.reducer;
