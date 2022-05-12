import React from "react";
import styles from "../styles/Loader.module.css";

function Loader() {
  return (
    <div
      style={{
        margin: "5rem auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={styles.ldsRing}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
