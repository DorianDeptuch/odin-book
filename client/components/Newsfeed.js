import React, { useState, useEffect, useContext } from "react";
import StatusUpdate from "./StatusUpdate";
import Post from "./Post";
import Box from "@mui/material/Box";
import { IndexContext } from "../pages/index";

function Newsfeed() {
  const index = useContext(IndexContext);

  useEffect(() => {
    console.log("index: ", index);
  }, []);

  return (
    <Box sx={{ m: 2 }}>
      <StatusUpdate />
      {/* <Post />
      <Post />
      <Post /> */}
    </Box>
  );
}

export default Newsfeed;
