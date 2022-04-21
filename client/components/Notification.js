import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { server, client } from "../../config/config";
import { formatDistance } from "date-fns";
import { UserContext } from "../pages/_app";

const typographyStyles = {
  alignSelf: "start",
  ml: 2,
};
const paperStyles = {
  m: 2,
  p: 2,
  cursor: "pointer",
};
const spanStyles = {
  textDecoration: "underline",
  color: "#00E",
  cursor: "pointer",
};

function Notification({ sender, recipient, date, content, type }) {
  const { user } = useContext(UserContext);

  return (
    <>
      {type === "Poke" && (
        <Link href={`${client}/profile/${sender._id}`}>
          <Paper elevation={3} sx={paperStyles}>
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
        <Link href={`${client}/profile/${sender._id}`}>
          <Paper elevation={3} sx={paperStyles}>
            <Stack direction="row">
              <Avatar src={sender?.profilePicture || null}>JS</Avatar>
              <Typography sx={typographyStyles}>
                <strong>
                  {sender?.firstName} {sender?.lastName}
                </strong>{" "}
                has accepted your Friend Request.
              </Typography>
            </Stack>
          </Paper>
        </Link>
      )}
      {type === "Liked Comment" && (
        <Paper elevation={3} sx={paperStyles}>
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
        <Link href={`${client}/profile/${recipient._id}#${content}`}>
          <Paper elevation={3} sx={paperStyles}>
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
        </Link>
      )}
      {type === "Comment On Post" && (
        <Link href={`${client}/profile/${recipient._id}#${content}`}>
          <Paper elevation={3} sx={paperStyles}>
            <Stack direction="row">
              <Avatar src={sender?.profilePicture || null}>JS</Avatar>
              <Stack>
                <Typography sx={typographyStyles}>
                  <strong>
                    {sender.firstName} {sender.lastName}
                  </strong>{" "}
                  commented on your Post.
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
      {type === "Friend Posted" && (
        <Paper elevation={3} sx={paperStyles}>
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
        <Paper elevation={3} sx={paperStyles}>
          <Stack>
            <Typography variant="h6" component="h6" sx={typographyStyles}>
              Welcome to OdinBook! <br />
            </Typography>
            <hr />
            <ul style={typographyStyles}>
              <li style={{ marginBottom: "1rem" }}>
                You can update your profile info in your{" "}
                <Link href={`${client}/profile/${user?.user?._id}`}>
                  <span style={spanStyles}>Profile Page.</span>
                </Link>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                You can update your Profile Picture, Password, <br />
                or Delete your Account in the{" "}
                <Link href={`${client}/settings`}>
                  <span style={spanStyles}>Settings Page.</span>
                </Link>{" "}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                And most importantly, you can start making friends <br />
                by visiting the{" "}
                <Link href={`${client}/search`}>
                  <span style={spanStyles}>Search Page</span>
                </Link>{" "}
                to find all current <br />
                OdinBook users
              </li>
            </ul>
          </Stack>
        </Paper>
      )}
    </>
  );
}

export default Notification;
