import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Request from "./Request";

function FriendRequests() {
  return (
    <Paper elevation={3} sx={{ mb: 2 }}>
      <Stack>
        <Typography variant="h6" component="h6" sx={{ px: 2, pt: 2 }}>
          Friend Requests
        </Typography>
        <Stack direction="row" sx={{ overflowX: "scroll", p: 2 }}>
          <Request />
          <Request />
          <Request />
        </Stack>
      </Stack>
    </Paper>
  );
}

export default FriendRequests;
