import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Biography from "./Biography";
import { bgc } from "../config/config";

function ProfileAbout() {
  return (
    <Box sx={{ backgroundColor: bgc }}>
      <Stack direction="row">
        <Paper sx={{ width: "40%", p: 2, mr: 2 }}>
          <Typography variant="h6" component="h6">
            Bio
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            dolorum excepturi hic reprehenderit autem unde harum laboriosam,
            vitae doloribus laborum! Suscipit eaque consectetur soluta officiis!
          </Typography>
        </Paper>
        <Box sx={{ width: "60%", ml: 2 }}>
          <Biography />
        </Box>
      </Stack>
    </Box>
  );
}

export default ProfileAbout;
