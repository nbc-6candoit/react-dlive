import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { __getSpots } from "../../redux/modules/spotDataSlice";
import styled from "styled-components";

const HotSpotList = () => {
  const dispatch = useDispatch();
  const { spot, isLoading, isError } = useSelector((state) => state.spotData);
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(__getSpots());
  }, []);

  //   console.log(Object.values(spot.images));

  const recentSpots = spot.slice(0, 6);

  return (
    <StSpotContainer>
      {recentSpots.map((spot) => (
        <Link to={`/spot/${spot.id}`} key={spot.id}>
          <Stbox>
            <img src={spot.images[0].url} alt={spot.name} />
          </Stbox>
        </Link>
      ))}
    </StSpotContainer>
  );
};

export default HotSpotList;

const StSpotContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 10px;
`;

const Stbox = styled.figure`
  width: 100%;
  height: 150px;
  background-color: lightcoral;
  border-radius: 13px;
  cursor: pointer;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
