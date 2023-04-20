import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
};

// FETCH  via l'API
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// CREATE & SAVE via l'API
export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  // "values" est l'objet que l'on reçoit du formulaire de création de produits
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        /*ajout d'un header d'autentification avec le token*/
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

// DELETE via l'API
export const productDelete = createAsyncThunk(
  "products/productDelete",
  // "id" est l'objet que l'on reçoit du formulaire de suppression
  async (id) => {
    try {
      console.log(`${url}/products/${id}`);
      const response = await axios.delete(
        `${url}/products/${id}`,
        /*ajout d'un header d'autentification avec le token*/
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      // push pour ajouter à la suite du tableau
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Produit ajouté");
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },

    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      /* filtrer tous les autres produit pour exclure celui avec l'id*/
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;

      state.deleteStatus = "success";
      toast.error("Produit supprimé");
    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
