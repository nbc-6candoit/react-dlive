import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "shared/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

const __getSpots = createAsyncThunk("getSpots", async (payload, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(db, "spot"));
    const spotsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return spotsData;
  } catch (error) {
    console.log("error:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

const Ocean = () => {
  const [viewName, setviewName] = useState(["오션뷰"]);
  const dispatch = useDispatch();
  const { spot } = useSelector((state) => state.spotData);

  useEffect(() => {
    dispatch(__getSpots([]));
  }, []);

  const oceanViewSpots = spot.filter((spot) => spot.view === "오션뷰") ?? [];

  return (
    <StbodyContainer>
      <h3>{viewName}</h3>
      {oceanViewSpots.map((spot) => (
        <React.Fragment>
          <StImage key={spot.id} src={spot.images[0]?.url} alt={spot.name} />
          <StInfoBox>
            <p>{spot.view}</p>
            <h1>{spot.name}</h1>
            <p> {spot.location}</p>
            {spot.facilities.map((facility, index) => (
              <React.Fragment key={index}>
                <span>{facility}</span>
                {index < spot.facilities.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </StInfoBox>
        </React.Fragment>
      ))}
    </StbodyContainer>
  );
};
const Separator = styled.span`
  color: #888; // Adjust color as needed
`;

const StbodyContainer = styled.main`
  max-width: 500px;
  margin: 18px 33px;
  padding: 20px;
`;

const StImage = styled.img`
  width: 540px;
  height: 235px;
  margin: 30px 2px;
  border-radius: 12px;
`;
const StInfoBox = styled.div`
  width: 540px;
  border-radius: 0px 0px 10px 10px;
  background: #fff;
  p {
    margin: 2px;
    color: #797979;
  }
  h1 {
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 4px 1px;
  }
  span {
    color: #797979;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 4px;
    border: 1px solid #f2f2f2ca;
    background-color: #f2f2f2ca;
    border-radius: 8px;
  }
`;

export default Ocean;