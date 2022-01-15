import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Comment() {
  return (
    <Paper sx={{ m: 1 }} elevation={3}>
      <Stack direction="row">
        <Box
          sx={{
            backgroundColor: "green",
            borderRadius: "50%",
            height: "35px",
            width: "35px",
            mx: 2,
            alignSelf: "center",
          }}
        ></Box>
        <Stack sx={{ mb: 2 }}>
          <Typography variant="h6" component="h6">
            John Smith
          </Typography>
          <Typography>Hey cool post dude!!</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Comment;
