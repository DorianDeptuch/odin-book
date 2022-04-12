import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { server, client } from "../../config/config";

function Notification({ sender, recipient, date, content, type }) {
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Stack direction="row">
        <Avatar src={sender?.profilePicture || null}>JS</Avatar>
        {type === "Poke" && (
          <Typography sx={{ alignSelf: "center", ml: 2 }}>
            <strong>
              {sender.firstName} {sender.lastName}
            </strong>{" "}
            poked you.
          </Typography>
        )}
        {type === "Friend Request Accept" && (
          <Typography sx={{ alignSelf: "center", ml: 2 }}>
            <strong>
              {sender.firstName} {sender.lastName}
            </strong>{" "}
            has accepted your Friend Request.
          </Typography>
        )}
        {type === "Liked Comment" && (
          <Typography sx={{ alignSelf: "center", ml: 2 }}>
            <strong>
              {sender.firstName} {sender.lastName}
            </strong>{" "}
            liked your Comment.
          </Typography>
        )}
        {type === "Liked Post" && (
          <Typography sx={{ alignSelf: "center", ml: 2 }}>
            <strong>
              {sender.firstName} {sender.lastName}
            </strong>{" "}
            liked your Post.
          </Typography>
        )}
        {type === "Comment On Post" && (
          <Typography sx={{ alignSelf: "center", ml: 2 }}>
            <strong>
              {sender.firstName} {sender.lastName}
            </strong>{" "}
            Commented on your Post.
          </Typography>
        )}
        {type === "Friend Posted" && (
          <Typography sx={{ alignSelf: "center", ml: 2 }}>
            <strong>
              {sender.firstName} {sender.lastName}
            </strong>{" "}
            created a Post.
          </Typography>
        )}
        {type === "Welcome Notification" && (
          <Typography sx={{ alignSelf: "center", ml: 2 }}>
            <strong>
              {sender.firstName} {sender.lastName}
            </strong>{" "}
            Welcome to OdinBook! You can update your profile info in your{" "}
            <Link href={`${client}/profile/${recipient._id}`}>Profile.</Link>
            You can update your Profile Picture, Password, or Delete your
            Account in the <Link href={`${client}/settings`}>Settings.</Link>
            And most importantly, you can start making friends by visiting the{" "}
            <Link href={`${client}/search`}>Search Page</Link> to find all
            current OdinBook users
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}

export default Notification;
