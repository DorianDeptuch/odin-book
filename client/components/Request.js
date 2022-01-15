import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Request() {
  return (
    <Box sx={{ m: 1 }}>
      <Stack direction="row">
        <Box
          sx={{
            backgroundColor: "green",
            borderRadius: "50%",
            height: "100px",
            width: "100px",
            alignSelf: "center",
            mr: 1,
          }}
        ></Box>
        <Stack>
          <Typography variant="h6" component="h6">
            Jane Smith
          </Typography>
          <Button color="primary" variant="contained">
            Confirm
          </Button>
          <Button color="secondary" variant="contained">
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Request;
