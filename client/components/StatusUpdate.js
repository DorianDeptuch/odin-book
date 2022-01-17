import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

function StatusUpdate() {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Stack>
        <Stack direction="row">
          <Avatar
            sx={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              mr: 2,
            }}
          ></Avatar>
          <TextField
            fullWidth
            id="statusUpdate"
            variant="outlined"
            defaultValue="What's on your mind, <USER>?"
          ></TextField>
        </Stack>
        <Stack direction="row">
          <Button>Image</Button>
          <Button>Post</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default StatusUpdate;
