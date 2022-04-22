import React from "react";
import Box from "@mui/material/Box";
import IndexFriendRequests from "./IndexFriendRequests";
import FriendsList from "./FriendsList";

function FriendSidebar() {
  return (
    <Box sx={{ m: 2 }}>
      <IndexFriendRequests />
      {/* <FriendsList /> */}
    </Box>
  );
}

export default FriendSidebar;
