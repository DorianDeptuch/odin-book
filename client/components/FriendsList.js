import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Friend from "./Friend";

function FriendsList() {
  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Stack>
        <Typography variant="h6" component="h6">
          Friend's List
        </Typography>
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </Stack>
    </Paper>
  );
}

export default FriendsList;
