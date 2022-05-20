import React, { useState } from "react";
import Box from "@mui/material/Box";
import IndexFriendRequests from "./IndexFriendRequests";
import IndexFriendsList from "./IndexFriendsList";

function FriendSidebar() {
  const [friendsList, setFriendsList] = useState([]);

  return (
    <Box sx={{ m: 2, display: ["none", "none", "block"] }}>
      <IndexFriendRequests setFriendsList={setFriendsList} />
      <IndexFriendsList
        friendsList={friendsList}
        setFriendsList={setFriendsList}
      />
    </Box>
  );
}

export default FriendSidebar;
