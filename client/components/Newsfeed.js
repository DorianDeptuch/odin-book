import React from "react";
import StatusUpdate from "./StatusUpdate";
import Post from "./Post";
import Box from "@mui/material/Box";

function Newsfeed() {
  return (
    <Box sx={{ m: 2 }}>
      <StatusUpdate />
      <Post />
      <Post />
      <Post />
    </Box>
  );
}

export default Newsfeed;
