import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { avatar_MD } from "../config/config";

const styles = {
  m: 0,
  p: 1,
};

function Comment() {
  return (
    <Paper sx={{ m: 1 }} elevation={3}>
      <Stack direction="row">
        <Avatar
          sx={{
            height: avatar_MD,
            width: avatar_MD,
            mx: 2,
            alignSelf: "center",
          }}
        ></Avatar>
        <Stack sx={{ mb: 2 }}>
          <Stack direction="row">
            <Typography variant="h4" component="h4" sx={styles}>
              <strong>John Smith</strong>
            </Typography>
            <Typography variant="caption" component="p" sx={styles}>
              (3h ago)
            </Typography>
          </Stack>
          <Typography variant="body1" component="p" sx={styles}>
            Hey cool post dude!!
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Comment;
