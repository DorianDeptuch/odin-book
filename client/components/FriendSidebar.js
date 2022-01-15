import React from "react";
import Box from "@mui/material/Box";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";

function FriendSidebar() {
  return (
    <Box sx={{ m: 2 }}>
      <FriendRequests />
      <FriendsList />
    </Box>
  );
}

export default FriendSidebar;
