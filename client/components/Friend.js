import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Friend() {
  return (
    <Box sx={{ m: 1 }}>
      <Stack direction="row">
        <Box
          sx={{
            backgroundColor: "green",
            borderRadius: "50%",
            height: "35px",
            width: "35px",
            mr: 1,
          }}
        ></Box>
        <Typography variant="h6" component="h6">
          John Smith
        </Typography>
      </Stack>
    </Box>
  );
}

export default Friend;
