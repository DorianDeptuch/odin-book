import React from "react";
import Box from "@mui/material/Box";
import IndexFriendRequests from "./IndexFriendRequests";
import IndexFriendsList from "./IndexFriendsList";

function FriendSidebar() {
  return (
    <Box sx={{ m: 2 }}>
      <IndexFriendRequests />
      <IndexFriendsList />
    </Box>
  );
}

export default FriendSidebar;
