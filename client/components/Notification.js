import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { server, client } from "../../config/config";
import { formatDistance } from "date-fns";

const typographyStyles = {
  alignSelf: "center",
  ml: 2,
};

function Notification({ sender, recipient, date, content, type }) {
  return (
    <>
      {type === "Poke" && (
        <Link href={`${client}/profile/${sender._id}`}>
          <Paper elevation={3} sx={{ m: 2, p: 2 }}>
            <Stack direction="row">
              <Avatar src={sender?.profilePicture || null}>JS</Avatar>
              <Stack>
                <Typography sx={typographyStyles}>
                  <strong>
                    {sender.firstName} {sender.lastName}
                  </strong>{" "}
                  poked you.
                </Typography>
                <Typography variant="body2" component="p" sx={typographyStyles}>
                  {formatDistance(new Date(date), new Date(), {
                    addSuffix: true,
                  })}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Link>
      )}
      {type === "Friend Request Accept" && (
        <Paper elevation={3} sx={{ m: 2, p: 2 }}>
          <Stack direction="row">
            <Avatar src={sender?.profilePicture || null}>JS</Avatar>
            <Typography sx={typographyStyles}>
              <strong>
                {sender.firstName} {sender.lastName}
              </strong>{" "}
              has accepted your Friend Request.
            </Typography>
          </Stack>
        </Paper>
      )}
      {type === "Liked Comment" && (
        <Paper elevation={3} sx={{ m: 2, p: 2 }}>
          <Stack direction="row">
            <Avatar src={sender?.profilePicture || null}>JS</Avatar>
            <Typography sx={typographyStyles}>
              <strong>
                {sender.firstName} {sender.lastName}
              </strong>{" "}
              liked your Comment.
            </Typography>
          </Stack>
        </Paper>
      )}
      {type === "Liked Post" && (
        <Paper elevation={3} sx={{ m: 2, p: 2 }}>
          <Stack direction="row">
            <Avatar src={sender?.profilePicture || null}>JS</Avatar>
            <Typography sx={typographyStyles}>
              <strong>
                {sender.firstName} {sender.lastName}
              </strong>{" "}
              liked your Post.
            </Typography>
          </Stack>
        </Paper>
      )}
      {type === "Comment On Post" && (
        <Paper elevation={3} sx={{ m: 2, p: 2 }}>
          <Stack direction="row">
            <Avatar src={sender?.profilePicture || null}>JS</Avatar>
            <Typography sx={typographyStyles}>
              <strong>
                {sender.firstName} {sender.lastName}
              </strong>{" "}
              Commented on your Post.
            </Typography>
          </Stack>
        </Paper>
      )}
      {type === "Friend Posted" && (
        <Paper elevation={3} sx={{ m: 2, p: 2 }}>
          <Stack direction="row">
            <Avatar src={sender?.profilePicture || null}>JS</Avatar>
            <Typography sx={typographyStyles}>
              <strong>
                {sender.firstName} {sender.lastName}
              </strong>{" "}
              created a Post.
            </Typography>
          </Stack>
        </Paper>
      )}
      {type === "Welcome Notification" && (
        <Paper elevation={3} sx={{ m: 2, p: 2 }}>
          <Stack direction="row">
            <Avatar src={sender?.profilePicture || null}>JS</Avatar>
            <Typography sx={typographyStyles}>
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
          </Stack>
        </Paper>
      )}
    </>
  );
}

export default Notification;
