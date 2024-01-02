import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "shared/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

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

const River = () => {
  const [viewName, setviewName] = useState(["리버뷰"]);
  const dispatch = useDispatch();
  const { spot } = useSelector((state) => state.spotData);

  useEffect(() => {
    dispatch(__getSpots([]));
  }, []);

  const viewSpots = spot.filter((spot) => spot.view === "리버뷰") ?? [];

  return (
    <StbodyContainer>
      <h3>{viewName}</h3>
      {viewSpots.map((spot) => (
        <React.Fragment key={spot.id}>
          <Link to={`/spot/${spot.id}`} key={spot.id}>
            <StImage key={spot.id} src={spot.images[0]?.url} alt={spot.name} />
          </Link>
          <StInfoBox key={spot.id}>
            <StviewStyle>{spot.view}</StviewStyle>
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
  color: #888;
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
  cursor: pointer;
`;

const StInfoBox = styled.div`
  width: 540px;
  border-radius: 0px 0px 10px 10px;
  background: #fff;
  label {
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
const StviewStyle = styled.p`
  color: white;
  background-color: #5eb470;
  border: 1px solid #5eb470;
  padding: 0.4rem 1rem;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
  font-size: 13px;
  cursor: auto;
  user-select: none;
`;
export default River;
