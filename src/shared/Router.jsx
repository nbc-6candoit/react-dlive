import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spotdetail" element={<SpotDetail />} />
        <Route path="/spot" element={<Spot />} />
        <Route path="/addspot" element={<AddSpot />} />
        <Route path="/log" element={<Log />} />
        <Route path="/addlog" element={<AddLog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
