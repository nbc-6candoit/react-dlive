import AddSpot from "../pages/AddSpot";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import Spot from "../pages/Spot";
import AddLog from "../pages/AddLog";
import SpotDetail from "../pages/SpotDetail";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Log from "../pages/Log";
import styled from "styled-components";
import Signup from "../pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InfoFix from "../pages/InfoFix";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <StRouterContainer>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage/:id" element={<Mypage />} />
          <Route path="/infofix" element={<InfoFix />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/spotdetail/:type" element={<SpotDetail />} />
          <Route path="/spot/:spotId" element={<Spot />} />
          <Route path="/addspot" element={<AddSpot />} />
          <Route path="/log/:id" element={<Log />} />
          <Route path="/addlog" element={<AddLog />} />
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
