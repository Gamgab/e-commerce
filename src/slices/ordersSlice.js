import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

const initialState = {
  list: [],
  status: null,
};

// FETCH via l'API
export const ordersFetch = createAsyncThunk("orders/ordersFetch", async () => {
  try {
    const response = await axios.get(`${url}/order`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// EDITER via l'API
export const ordersEdit = createAsyncThunk(
  "orders/ordersEdit",
  // "values" est l'objet que l'on reçoit de l'appel de la fonction
  async (values, { getState }) => {
    const state = getState();

    let currentOrder = state.orders.list.filter(
      (order) => order._id === values.id
    );

    const newOrder = {
      ...currentOrder[0],
      delivery_status: values.delivery_status,
    };

    try {
      const response = await axios.put(
        `${url}/order/${values.id}`,
        newOrder,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [ordersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [ordersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [ordersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [ordersEdit.pending]: (state, action) => {
      state.status = "pending";
    },
    [ordersEdit.fulfilled]: (state, action) => {
      const updateOrders = state.list.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.list = updateOrders;
      state.status = "success";
    },
    [ordersEdit.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default ordersSlice.reducer;
