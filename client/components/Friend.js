import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { avatar_SM } from "../config/config";

function Friend() {
  return (
    <Box sx={{ m: 1 }}>
      <Stack direction="row">
        <Avatar
          sx={{
            height: avatar_SM,
            width: avatar_SM,
            mr: 1,
          }}
        ></Avatar>
        <Typography variant="h6" component="h6">
          John Smith
        </Typography>
      </Stack>
    </Box>
  );
}

export default Friend;
