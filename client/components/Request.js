import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
function Request() {
  return (
    <Box sx={{ m: 1 }}>
      <Stack direction="row">
        <Avatar
          sx={{
            height: "100px",
            width: "100px",
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
    </Box>
  );
}

export default Request;
