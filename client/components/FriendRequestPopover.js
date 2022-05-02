import React, { useContext, useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Request from "./Request";
import { UserContext } from "../pages/_app";

function FriendRequestPopover({
  idRequest,
  openRequest,
  anchorElRequest,
  handleCloseRequest,
  setAnchorElRequest,
  setFriendRequestLength,
  friendRequestLength,
}) {
  const { user } = useContext(UserContext);
  const [friendRequestArray, setFriendRequestArray] = useState(
    user?.user?.friendRequests || null
  );
  const [hasFriendRequests, setHasFriendRequests] = useState(false);

  useEffect(() => {
    setHasFriendRequests(friendRequestArray?.length ? true : false);
  }, [user]);

  useEffect(() => {
    friendRequestLength === 0 && setHasFriendRequests(false);
  }, [friendRequestLength, user]);

  return (
    <Popover
      id={idRequest}
      open={openRequest}
      anchorEl={anchorElRequest}
      onClose={handleCloseRequest}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {hasFriendRequests ? (
        <>
          {friendRequestArray &&
            friendRequestArray.map((item) => (
              <Request
                key={item._id}
                friendRequestID={item._id}
                sender={item.sender}
                recipient={item.recipient}
                date={item.date}
                setFriendRequestLength={setFriendRequestLength}
                setAnchorElRequest={setAnchorElRequest}
                setFriendRequestArray={setFriendRequestArray}
              />
            ))}
        </>
      ) : (
        <Typography
          variant="body1"
          component="p"
          textAlign="center"
          sx={{ m: 2, color: "#999" }}
        >
          There are no Friend Requests to display.
        </Typography>
      )}
    </Popover>
  );
}

export default FriendRequestPopover;
