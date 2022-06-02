import React, { useEffect, useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { avatar_LG, toastOptions } from "../config/config";
import { server, client } from "../../config/config";
import { toast } from "react-toastify";
import Link from "next/link";
import { FriendRequestContext } from "../pages/_app";

function Request({
  sender,
  recipient,
  date,
  friendRequestID,
  setFriendRequestLength,
  friendRequestLength,
  setAnchorElRequest,
  setFriendRequestArray,
}) {
  const [clicked, setClicked] = useState(false);
  const regex = /[a-z0-9]{20}/;
  const { acceptedRequests, setAcceptedRequests } =
    useContext(FriendRequestContext);

  const handleFriendRequestAccept = (e) => {
    e.preventDefault();
    const data = {
      sender,
      recipient,
      friendRequestID,
    };

    fetch(`${server}/profile/${recipient?._id}/friendRequestAccept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setFriendRequestLength((prev) => prev - 1);
        handleFriendRequestArray();
        setAnchorElRequest(null);
        toast.success(
          `You and ${sender.firstName} are now Friends!`,
          toastOptions
        );
        setClicked(true);
        setAcceptedRequests((prev) => [...prev, sender._id]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  const handleFriendRequestDeny = (e) => {
    e.preventDefault();
    const data = {
      sender,
      recipient,
      friendRequestID,
    };

    fetch(`${server}/profile/${recipient?._id}/friendRequestDeny`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setFriendRequestLength((prev) => prev - 1);
        handleFriendRequestArray();
        setAnchorElRequest(null);
        toast.info(
          `You have denied ${sender.firstName}'s friendship.`,
          toastOptions
        );
        setClicked(true);
        setAcceptedRequests((prev) => [...prev, sender._id]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  const handleFriendRequestArray = () => {
    if (friendRequestLength === 0) {
      setFriendRequestArray([]);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleFriendRequestArray();
    console.log(friendRequestID);
    console.log(sender._id);
  }, [friendRequestLength]);

  return (
    <>
      {!acceptedRequests.includes(sender._id) &&
        (!clicked ? (
          <Paper sx={{ m: 2, p: 2 }} elevation={3}>
            <Stack direction="row">
              <Link href={`${client}/profile/${sender?._id}`}>
                <Avatar
                  src={
                    regex.test(sender?.profilePicture)
                      ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1652941781/${sender?.profilePicture}.jpg`
                      : sender?.profilePicture || ""
                  }
                  sx={{
                    height: avatar_LG,
                    width: avatar_LG,
                    alignSelf: "center",
                    mr: 1,
                  }}
                >
                  {`${sender?.firstName.charAt(0)}${sender?.lastName.charAt(
                    0
                  )}`}
                </Avatar>
              </Link>
              <Stack sx={{ ml: 1 }}>
                <Link href={`${client}/profile/${sender?._id}`}>
                  <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                    <strong>
                      {sender.firstName} {sender.lastName}
                    </strong>{" "}
                    wants to be your friend.
                  </Typography>
                </Link>
                <Stack direction="row" sx={{ mt: 1 }}>
                  <form
                    action="/friendRequestAccept"
                    method="POST"
                    style={{ width: "100%", marginRight: "0.5rem" }}
                    onSubmit={handleFriendRequestAccept}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ width: "100%" }}
                      type="submit"
                    >
                      Confirm
                    </Button>
                  </form>
                  <form
                    action="/friendRequestDeny"
                    method="POST"
                    style={{ width: "100%", marginLeft: "0.5rem" }}
                    onSubmit={handleFriendRequestDeny}
                  >
                    <Button
                      sx={{ bgcolor: red[900], width: "100%" }}
                      variant="contained"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </form>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        ) : (
          ""
        ))}
    </>
  );
}

export default Request;
