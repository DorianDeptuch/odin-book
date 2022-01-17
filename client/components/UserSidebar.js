import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";

const iconStyle = {
  height: "30px",
  width: "30px",
  mr: 1,
};

function UserSidebar() {
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Box>
        <Stack direction="row" sx={{ p: 1 }}>
          <Avatar sx={iconStyle}></Avatar>
          <Typography variant="h6" component="h6" sx={{ alignSelf: "center" }}>
            User Name
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ p: 1 }}>
          <GroupIcon sx={iconStyle}></GroupIcon>
          <Typography variant="h6" component="h6" sx={{ alignSelf: "center" }}>
            Friends
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ p: 1 }}>
          <SettingsIcon sx={iconStyle}></SettingsIcon>
          <Typography variant="h6" component="h6" sx={{ alignSelf: "center" }}>
            Settings
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default UserSidebar;
