import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProfileBio from "./ProfileBio";
import ProfileInfo from "./ProfileInfo";
import ProfileIntro from "./ProfileIntro";
import ProfileDetailsForm from "./ProfileDetailsForm";
import { bgc } from "../config/config";

function ProfileAbout() {
  return (
    <Box sx={{ backgroundColor: bgc, mx: -3 }}>
      <Stack direction="row">
        <Paper elevation={3} sx={{ width: "40%", p: 2, mr: 2, mb: 2 }}>
          <ProfileIntro />
        </Paper>
        <Paper elevation={3} sx={{ width: "60%", p: 2, ml: 2 }}>
          <ProfileInfo />
        </Paper>
      </Stack>
      <Stack direction="row">
        <Paper elevation={3} sx={{ width: "60%", p: 2, mt: 2, mr: 2 }}>
          <ProfileBio />
        </Paper>
        <Paper elevation={3} sx={{ width: "40%", p: 2, mt: 2, ml: 2 }}>
          <Box>
            <Stack>
              <Typography variant="h6" component="h6">
                Edit Your Profile Info
              </Typography>
              <Button variant="contained" sx={{ my: 1 }}>
                Edit Details
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Stack>
      <ProfileDetailsForm />
    </Box>
  );
}

export default ProfileAbout;
