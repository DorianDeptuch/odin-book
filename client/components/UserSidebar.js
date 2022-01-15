import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const iconStyle = {
  backgroundColor: "red",
  borderRadius: "50%",
  height: "50px",
  width: "50px",
  mr: 1,
};

function UserSidebar() {
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Box>
        <Stack direction="row" sx={{ p: 1 }}>
          <Box sx={iconStyle}></Box>
          <Typography variant="h6" component="h6" sx={{ alignSelf: "center" }}>
            User Name
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ p: 1 }}>
          <Box sx={iconStyle}></Box>
          <Typography variant="h6" component="h6" sx={{ alignSelf: "center" }}>
            Friends
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ p: 1 }}>
          <Box sx={iconStyle}></Box>
          <Typography variant="h6" component="h6" sx={{ alignSelf: "center" }}>
            Settings
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default UserSidebar;
