import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { bgc } from "../config/config";

function Layout({ children }) {
  return (
    <div style={{ backgroundColor: bgc, height: "100%" }}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
