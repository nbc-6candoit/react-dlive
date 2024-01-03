import AddSpot from "../pages/AddSpot";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import Spot from "../pages/Spot";
import AddLog from "../pages/AddLog";
import SpotDetail from "../pages/SpotDetail";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Log from "../pages/Log";
import styled from "styled-components";
import Signup from "../pages/Signup";
import Mountains from "components/Home/viewDetail/Mountains";
import Ocean from "components/Home/viewDetail/Ocean";
import River from "components/Home/viewDetail/River";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import InfoFix from "../pages/InfoFix";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState } from "../redux/modules/authSlice";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const dispatch = useDispatch();
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(checkAuthState());
    };

    fetchData();
  }, [dispatch]);
  console.log("라우터", isLogin);
  console.log("라우터", isAuthChecked);

  return (
    <BrowserRouter>
      <Header />
      <StRouterContainer>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/viewDetail/Mountains/" element={<Mountains />} />
          <Route path="/viewDetail/Ocean" element={<Ocean />} />
          <Route path="/viewDetail/River" element={<River />} />
          <Route path="/mypage/:id" element={<Mypage />} />
          <Route path="/infofix" element={<InfoFix />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/spotdetail/:type" element={<SpotDetail />} />
          <Route path="/spot/:spotId" element={<Spot />} />
          <Route path="/log/:id/:spotId" element={<Log />} />
          <Route path="*" element={<Main />} />
          <Route element={<PrivateRoute />}>
            <Route path="/addspot" element={<AddSpot />} />
            <Route path="/addlog/:spotId" element={<AddLog />} />
          </Route>
        </Routes>
        <Footer />
      </StRouterContainer>
    </BrowserRouter>
  );
};

export default Router;

const StRouterContainer = styled.div`
  margin-left: 50%;
`;
