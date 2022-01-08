import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div style={{ backgroundColor: "#f1f2f6", height: "100vh" }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
