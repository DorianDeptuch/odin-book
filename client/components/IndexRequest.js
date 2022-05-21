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
import { useRouter } from "next/router";
import { UserContext } from "../pages/_app";
import { FriendRequestContext } from "../pages/_app";
import Link from "next/link";

function IndexRequest({
  sender,
  recipient,
  friendRequestID,
  setFriendRequestArray,
  setFriendsList,
}) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);
  const { friendRequestLength, setFriendRequestLength } =
    useContext(FriendRequestContext);
  const regex = /[a-z0-9]{20}/;

  const handleFriendRequestArray = () => {
    if (friendRequestLength === 0) {
      setFriendRequestArray([]);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleFriendRequestArray();
  }, [friendRequestLength]);

  const handleFriendRequestAccept = (e) => {
    e.preventDefault();
    const data = {
      sender,
      recipient: recipient || user?.user?._id,
      friendRequestID,
    };

    fetch(`${server}/profile/${recipient?._id}/friendRequestAccept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        let acceptedFriend = data;
        setFriendRequestLength((prev) => prev - 1);
        handleFriendRequestArray();
        setClicked(true);
        toast.success(
          `You and ${sender.firstName} are now Friends!`,
          toastOptions
        );
        setFriendsList((prev) => [acceptedFriend, ...prev]);
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
        setClicked(true);
        toast.info(
          `You have denied ${sender.firstName}'s friendship.`,
          toastOptions
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  return (
    <>
      {!clicked ? (
        <Paper sx={{ m: 2, p: 2 }} elevation={3}>
          <Stack>
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
                {`${sender?.firstName.charAt(0)}${sender?.lastName.charAt(0)}`}
              </Avatar>
            </Link>
            <Stack sx={{ ml: 1 }}>
              <Link href={`${client}/profile/${sender?._id}`}>
                <Typography
                  variant="body1"
                  align="center"
                  component="p"
                  sx={{ mt: 1 }}
                >
                  <strong>
                    {sender.firstName} {sender.lastName}
                  </strong>
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
      )}
    </>
  );
}

export default IndexRequest;
