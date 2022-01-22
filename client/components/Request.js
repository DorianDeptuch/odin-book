import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { avatar_LG } from "../config/config";

function Request() {
  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      <Stack direction="row">
        <Avatar
          sx={{
            height: avatar_LG,
            width: avatar_LG,
            alignSelf: "center",
            mr: 1,
          }}
        >
          JS
        </Avatar>
        <Stack>
          <Typography variant="h6" component="h6">
            Jane Smith
          </Typography>
          <Button color="primary" variant="contained">
            Confirm
          </Button>
          <Button sx={{ bgcolor: red[900] }} variant="contained">
            Delete
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Request;
