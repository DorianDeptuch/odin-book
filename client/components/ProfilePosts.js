import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Biography from "./Biography";
import StatusUpdate from "./StatusUpdate";
import Post from "./Post";
import FriendsList from "./FriendsList";

function ProfilePosts() {
  return (
    <Box sx={{ mx: -3 }}>
      <Stack direction="row">
        <Stack sx={{ width: "40%", mr: 2 }}>
          <Biography />
          <FriendsList sx={{ my: 2 }} />
        </Stack>
        <Stack sx={{ width: "60%", ml: 2 }}>
          <StatusUpdate />
          <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6" component="h6">
              Posts
            </Typography>
          </Paper>
          <Post />
          <Post />
          <Post />
        </Stack>
      </Stack>
    </Box>
  );
}

export default ProfilePosts;
