import React from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export const Main = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Header />
      <main className="w-full h-full flex-1 flex flex-col justify-start items-center gap-2 mb-5">
        <Sidebar />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
