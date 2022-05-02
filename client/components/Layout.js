import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { bgc } from "../config/config";
import Box from "@mui/material/Box";

function Layout({ children }) {
  return (
    <Box
      sx={{
        backgroundColor: bgc,
        height: "100%",
        minHeight: "100vh",
        display: ["flex", "block"],
        flexDirection: "column",
      }}
    >
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
    </Box>
  );
}

export default Layout;
