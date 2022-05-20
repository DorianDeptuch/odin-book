import React, { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IndexRequest from "./IndexRequest";
import { UserContext } from "../pages/_app";

function IndexFriendRequests({ setFriendsList }) {
  const { user } = useContext(UserContext);
  const [friendRequestArray, setFriendRequestArray] = useState(
    user?.user?.friendRequests
  );
  const [friendRequestLength, setFriendRequestLength] = useState(
    user?.user?.friendRequests.length
  );

  useEffect(() => {
    setFriendRequestArray(user?.user?.friendRequests);
    setFriendRequestLength(user?.user?.friendRequests.length);
  }, [user]);

  return (
    <Paper elevation={3} sx={{ mb: 2 }}>
      <Stack>
        <Typography variant="h6" component="h6" sx={{ px: 2, pt: 2 }}>
          Friend Requests
        </Typography>
        <Stack direction="row" sx={{ overflowX: "scroll", p: 2 }}>
          {friendRequestArray &&
            friendRequestArray.map((item) => (
              <IndexRequest
                key={item._id}
                friendRequestID={item._id}
                sender={item.sender}
                recipient={item?.recipient}
                setFriendsList={setFriendsList}
                setFriendRequestLength={setFriendRequestLength}
                setFriendRequestArray={setFriendRequestArray}
                friendRequestLength={friendRequestLength}
              />
            ))}
          {friendRequestLength === 0 && (
            <Typography
              variant="h6"
              component="h6"
              textAlign="center"
              sx={{ my: 2, color: "#999" }}
            >
              There are no Friend Requests to display
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default IndexFriendRequests;
