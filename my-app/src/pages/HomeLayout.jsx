import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
