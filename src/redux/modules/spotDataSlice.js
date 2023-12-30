import { collection, getDocs } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "shared/firebase";

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
      const spotsData = querySnapshop.docs.map((doc) => doc.data());

      return thunkAPI.fulfillWithValue(spotsData);
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
      // 스토리지에 먼저 사진 업로드
      const imageUrls = [];
      for (const image of newSpot.images) {
        const imageRef = ref(storage, `log_images/${image}`);
        await uploadBytes(imageRef, image);

        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }

      const addedSpot = {
        id: uuid(),
        ...newSpot,
        images: imageUrls,
      };
      return addedSpot;
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
