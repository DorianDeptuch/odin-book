import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { bgc } from "../config/config";

function Layout({ children }) {
  return (
    <div style={{ backgroundColor: bgc, height: "100vh" }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
