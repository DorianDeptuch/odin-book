import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function Notification() {
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Stack direction="row">
        <Avatar>JS</Avatar>
        <Typography sx={{ alignSelf: "center", ml: 2 }}>
          <strong>Jane Smith</strong> liked your post.
        </Typography>
      </Stack>
    </Paper>
  );
}

export default Notification;
