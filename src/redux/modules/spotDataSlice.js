import { addDoc, collection, getDocs } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "shared/firebase";

const initialState = {
  spot: [],
  spotDetails: null,
  isLoading: false,
  isError: false,
};

export const __getSpots = createAsyncThunk(
  "getSpots",
  async (payload, thunkAPI) => {
    try {
      const querySnapshop = await getDocs(collection(db, "spot"));
      const spotsData = querySnapshop.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return spotsData;
    } catch (error) {
      console.log("error :", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addSpot = createAsyncThunk(
  "addSpot",
  async (newSpot, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "spot"), newSpot);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("error :", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const spotDataSlice = createSlice({
  name: "spot",
  initialState,
  reducers: {
    addSpot: (state, action) => {
      const newSpot = action.payload;
      return { ...state, spot: [newSpot, ...state.spot] };
    },
    deleteSpot: (state, action) => {
      const spotId = action.payload;
      return state.spot.filter((spot) => spot.id !== spotId);
    },
    editSpot: (state, action) => {
      const {
        id,
        name,
        location,
        view,
        seasons,
        facilities,
        sum,
        content,
        images,
      } = action.payload;
      return state.map((spot) => {
        if (spot.id === id) {
          return {
            ...spot,
            name,
            location,
            view,
            seasons,
            facilities,
            sum,
            content,
            images,
          };
        }
        return spot;
      });
    },
    setSpotDetails: (state, action) => {
      state.spotDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getSpots.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getSpots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.spot = action.payload;
      })
      .addCase(__getSpots.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addSpot, deleteSpot, editSpot, setSpotDetails } =
  spotDataSlice.actions;
export default spotDataSlice.reducer;
